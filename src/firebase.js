import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzpmCnPkgoUFdmEJEQ67nMMKOXjUbgHOI",
  authDomain: "harika-portfolio-ee03c.firebaseapp.com",
  projectId: "harika-portfolio-ee03c",
  storageBucket: "harika-portfolio-ee03c.firebasestorage.app",
  messagingSenderId: "152024560386",
  appId: "1:152024560386:web:1831661f4dd874701e881b",
  measurementId: "G-4Q9JREKCNW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
