import { initializeApp, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsx-JoT2qQ4W1kwaJ1jLpCW1pnR3g5ltk",
  authDomain: "whatcomesnext-2631d.firebaseapp.com",
  projectId: "whatcomesnext-2631d",
  storageBucket: "whatcomesnext-2631d.appspot.com",
  messagingSenderId: "1086278947537",
  appId: "1:1086278947537:web:1cfa60ab789a5824156bf0"
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  if (error.code === 'app/duplicate-app') {
    // If an app is already initialized, use that one
    app = getApp();
  } else {
    console.error('Firebase initialization error:', error);
    throw error;
  }
}

// Get Firebase Storage instance
const storage = getStorage(app);

export { storage, app };
