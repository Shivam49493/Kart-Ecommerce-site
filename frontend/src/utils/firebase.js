import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";




const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
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