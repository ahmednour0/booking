import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdEBeltPh5aidLT9OAuZLWAzzzeySfGNc",
  authDomain: "booking-app-32650.firebaseapp.com",
  projectId: "booking-app-32650",
  storageBucket: "booking-app-32650.firebasestorage.app",
  messagingSenderId: "589359048628",
  appId: "1:589359048628:web:290f52ada86bd713f7b4e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

export {auth,db};