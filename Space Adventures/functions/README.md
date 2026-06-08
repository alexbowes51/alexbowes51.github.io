Cloud Function: submitScore

This Cloud Function provides a secure endpoint for submitting leaderboard scores with:
- App Check verification
- ID token verification (require authenticated user)
- Per-user rate limiting stored in Firestore

Files:
- `index.js` - Express app exported as `app` function
- `package.json` - Node dependencies and scripts

How it works:
1. Client sends a POST to the function URL `/submitScore` with JSON `{ name, score }`.
2. The request must include:
   - `Authorization: Bearer <ID_TOKEN>` header (Firebase ID token from client auth)
   - `X-Firebase-AppCheck: <APP_CHECK_TOKEN>` header (App Check token, automatically sent by Firebase SDK when App Check is active)
3. The function verifies App Check and ID token, then enforces a simple rate limit per `uid` and updates Firestore `leaderboard/{uid}` only if the new score is higher.

Deploy
-----
Install Firebase CLI and login:

```bash
npm install -g firebase-tools
firebase login
```

Initialize functions (if not already):

```bash
cd Space\ Adventures/functions
firebase init functions
```

Deploy:

```bash
firebase deploy --only functions:app
```

Local testing with emulator:

```bash
# from workspace root
cd Space\ Adventures
npm --prefix functions install
npm --prefix functions run serve
```

Security notes
--------------
- Use App Check to prevent unauthorized clients from calling the endpoint.
- The function uses the Admin SDK so it bypasses Firestore rules. The function itself enforces per-user rate limits.
- Consider further protections (IP-based throttling, Captcha on sign-up) for high-traffic deployments.
