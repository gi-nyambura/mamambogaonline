// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";            // Import Auth
import { getFirestore } from "firebase/firestore";  // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn5Y6kZBSXJh3O8pPj3VQVsBNxnwbOyE0",
  authDomain: "mamambogaonline-c48c0.firebaseapp.com",
  projectId: "mamambogaonline-c48c0",
  storageBucket: "mamambogaonline-c48c0.firebasestorage.app",
  messagingSenderId: "106359683528",
  appId: "1:106359683528:web:16d4e7231b32270c4c28fd",
  measurementId: "G-F6WRT9YDJT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
