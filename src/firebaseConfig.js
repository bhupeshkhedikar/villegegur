// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKAIbObkBaNM_-vce6NeoTgjntMGx9H8E",
  authDomain: "gpgurdha-645cf.firebaseapp.com",
  projectId: "gpgurdha-645cf",
  storageBucket: "gpgurdha-645cf.firebasestorage.app",
  messagingSenderId: "81338681633",
  appId: "1:81338681633:web:d68e45e5f555f6c51c1660",
  measurementId: "G-VHDMMHDQ3F"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);