// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFTjksJq6jvM8ZHDxBIEjJjwsNE7Uh9fA",
  authDomain: "playground-29d19.firebaseapp.com",
  projectId: "playground-29d19",
  storageBucket: "playground-29d19.firebasestorage.app",
  messagingSenderId: "1063228640125",
  appId: "1:1063228640125:web:8b2114403b4579c76b9a14",
  measurementId: "G-1T54J1KDKD",
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;
// let analytics: Analytics;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
  // analytics = getAnalytics(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
  // analytics = getAnalytics(app);
}

export { auth, storage };
