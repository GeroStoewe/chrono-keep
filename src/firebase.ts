import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"; // added this line for database integration
import { getStorage } from "firebase/storage"; // added this line for getStorage

// The actual data is inside the ".env.local" file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL:
    "https://chrono-keep-default-rtdb.europe-west1.firebasedatabase.app/" // Added our Realtime Database URL
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const realtimeDb = getDatabase(app); // Exports Realtime Database instance
export const storage = getStorage(app); // Exports Storage instance
export { app, googleProvider };
