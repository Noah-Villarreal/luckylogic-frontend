// src/utils/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config (safe to share in client-side apps)
const firebaseConfig = {
  apiKey: "AIzaSyBDI7xC8hcYOEUbk1jrW3N-iM-awpeWs2Y",
  authDomain: "luckylogic-bfde9.firebaseapp.com",
  projectId: "luckylogic-bfde9",
  storageBucket: "luckylogic-bfde9.appspot.com",
  messagingSenderId: "434046149372",
  appId: "1:434046149372:web:421ab0b11cd9e89704ed79",
  measurementId: "G-NB6VMFBXNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Connect to Firestore (this is what we’ll use)
const db = getFirestore(app);

export default db;