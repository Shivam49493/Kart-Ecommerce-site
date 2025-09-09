// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "loginkart-2e739.firebaseapp.com",
  projectId: "loginkart-2e739",
  storageBucket: "loginkart-2e739.firebasestorage.app",
  messagingSenderId: "265202447164",
  appId: "1:265202447164:web:5ab4090fa294b82ca8e439"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
export { auth, provider };