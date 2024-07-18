// Import the functions you need from the SDKs you need
import { FirebaseApp, getApps, initializeApp } from 'firebase/app';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

/**
 * Gets an array of all the currently initialized Firebase apps.
 * @returns {FirebaseApp[]} An array of all the currently initialized Firebase apps.
 */
const alreadyCreatedAps = getApps();

/**
 * Initializes a Firebase app with the provided configuration, or returns the first already initialized app if one exists.
 * @returns {FirebaseApp} The initialized Firebase app.
 */
export const app =
  alreadyCreatedAps.length === 0 ? initializeApp(firebaseConfig, 'app') : alreadyCreatedAps[0];

const firebase = initializeApp(firebaseConfig);

export default firebase;
