// Paste your Firebase config object here to enable cross-device leaderboard syncing.
// Create a Firebase project, enable Firestore, then set the config below and set ENABLE_REMOTE_LEADERBOARD = true.
// Example config (replace with your project's values):
// window.FIREBASE_CONFIG = {
//   apiKey: "API_KEY",
//   authDomain: "PROJECT_ID.firebaseapp.com",
//   projectId: "PROJECT_ID",
//   storageBucket: "PROJECT_ID.appspot.com",
//   messagingSenderId: "SENDER_ID",
//   appId: "APP_ID"
// };

window.FIREBASE_CONFIG = null; // set to your config object to enable
window.ENABLE_REMOTE_LEADERBOARD = false; // set to true after adding config

// Optional: set this to your deployed Cloud Function base URL (the function route in README).
// Example: window.FUNCTION_ENDPOINT = 'https://us-central1-yourproject.cloudfunctions.net/app';
// The client will POST to `${FUNCTION_ENDPOINT}/submitScore` with ID token + App Check.
window.FUNCTION_ENDPOINT = null; // set to your function base URL to enable server-submitted scores

// Notes:
// - Firestore rules should allow writes from your game or be secured via an authentication layer.
// - For simple testing you can set rules to allow reads/writes (NOT recommended for production):
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if true;
//     }
//   }
// }
