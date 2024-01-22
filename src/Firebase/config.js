// Import the functions you need from the SDKs you need
import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "studentconnect-7fd63.firebaseapp.com",
  projectId: "studentconnect-7fd63",
  storageBucket: "studentconnect-7fd63.appspot.com",
  messagingSenderId: "399488695328",
  appId: "1:399488695328:web:ddcdfc25e8a8af142b1045",
  measurementId: "G-RDW1XKZWV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};