// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUDN-owqpq8dUvtSX8J6cZ7GH3jNCPGf4",
  authDomain: "household-3316e.firebaseapp.com",
  projectId: "household-3316e",
  storageBucket: "household-3316e.appspot.com",
  messagingSenderId: "1074923991926",
  appId: "1:1074923991926:web:9713ee716d7de1e0db8057",
  measurementId: "G-QKVXSY3VL4"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

export const storage = getStorage(firebaseApp);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);