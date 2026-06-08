// Firebase web config for Space Adventures — pasted from user input.
// Do NOT commit production secrets to public repos; treat these as project-specific.
window.FIREBASE_CONFIG = {
	apiKey: "AIzaSyDAEZpM3fWQH5gke2xoyEV42NVZ6GI_1OI",
	authDomain: "space-adventures-lb.firebaseapp.com",
	projectId: "space-adventures-lb",
	storageBucket: "space-adventures-lb.firebasestorage.app",
	messagingSenderId: "1032548608208",
	appId: "1:1032548608208:web:f8260295a2a25fc2f916d5",
	measurementId: "G-8Z9702ZBC9"
};

// Enable remote leaderboard client-side behavior (set to true to allow remote sync).
window.ENABLE_REMOTE_LEADERBOARD = true;

// Optional: set this to your deployed Cloud Function base URL (the function route in README).
// Example: window.FUNCTION_ENDPOINT = 'https://us-central1-yourproject.cloudfunctions.net/app';
// The client will POST to `${FUNCTION_ENDPOINT}/submitScore` with ID token + App Check.
// If you deployed the Cloud Function in the default region, use this URL.
// If you deployed to a different region, replace `us-central1` with your region.
window.FUNCTION_ENDPOINT = 'https://us-central1-space-adventures-lb.cloudfunctions.net/app'; // set to your function base URL to enable server-submitted scores

// Notes:
// - The project initialization (initializeApp) is done in the game's JS (`assets/JavaScript.js`) via `remoteInit()`.
// - If you prefer manual initialization, call `initializeApp(window.FIREBASE_CONFIG)` in a script
//   that runs before `assets/JavaScript.js`.
