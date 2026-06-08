const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize admin SDK
admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json());

// Rate limit settings
const MIN_SUBMIT_INTERVAL_MS = 5000; // 5 seconds per user
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 10; // max submissions per minute per user

// Helper: get client IP from request
function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.ip || req.connection.remoteAddress || '';
}

// POST /submitScore
// Body: { name: string, score: number }
app.post('/submitScore', async (req, res) => {
  try {
    const appCheckToken = req.header('X-Firebase-AppCheck') || req.header('x-firebase-appcheck');
    if (!appCheckToken) return res.status(401).json({ error: 'Missing App Check token' });

    // Verify App Check token
    const appCheckClaims = await admin.appCheck().verifyToken(appCheckToken);
    if (!appCheckClaims) return res.status(401).json({ error: 'Invalid App Check token' });

    // Verify ID token (authorization) if provided
    const authHeader = req.header('Authorization') || '';
    let uid = null;
    if (authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const decoded = await admin.auth().verifyIdToken(idToken);
      uid = decoded.uid;
    } else {
      // If no ID token provided, require anonymous auth header: expect uid in body (less secure)
      return res.status(401).json({ error: 'Missing Authorization ID token' });
    }

    const { name, score } = req.body || {};
    if (typeof name !== 'string' || typeof score !== 'number') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const ip = getClientIp(req);
    const now = Date.now();

    // Rate-limiting stored in `rateLimits/{uid}`
    const rateDocRef = db.collection('rateLimits').doc(uid);

    await db.runTransaction(async (tx) => {
      const doc = await tx.get(rateDocRef);
      let data = { lastSubmit: 0, windowStart: now, count: 0, lastIp: ip };
      if (doc.exists) data = doc.data();

      // Reset window if expired
      if (now - (data.windowStart || 0) > WINDOW_MS) {
        data.windowStart = now;
        data.count = 0;
      }

      // Check min interval
      if (now - (data.lastSubmit || 0) < MIN_SUBMIT_INTERVAL_MS) {
        throw new functions.https.HttpsError('resource-exhausted', 'Too many requests - slow down');
      }

      if ((data.count || 0) >= MAX_PER_WINDOW) {
        throw new functions.https.HttpsError('resource-exhausted', 'Rate limit exceeded');
      }

      // Update rate doc
      data.lastSubmit = now;
      data.count = (data.count || 0) + 1;
      data.lastIp = ip;

      tx.set(rateDocRef, data);

      // Now update leaderboard under `leaderboard/{uid}` only if score > existing
      const lbRef = db.collection('leaderboard').doc(uid);
      const lbDoc = await tx.get(lbRef);
      if (!lbDoc.exists) {
        tx.set(lbRef, { uid, name, score, updated: admin.firestore.FieldValue.serverTimestamp() });
      } else {
        const existing = lbDoc.data();
        if ((existing.score || 0) < score) {
          tx.update(lbRef, { name, score, updated: admin.firestore.FieldValue.serverTimestamp() });
        }
      }
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('submitScore error', err);
    if (err instanceof functions.https.HttpsError) {
      return res.status(429).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal server error' });
  }
});

exports.app = functions.https.onRequest(app);
