import { initializeApp } from "firebase/App";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAc1aEXdyv4j7Q2Zd46bwd-M8LPriwb-8I",
  authDomain: "thinkboard-auth.firebaseapp.com",
  projectId: "thinkboard-auth",
  storageBucket: "thinkboard-auth.firebasestorage.app",
  messagingSenderId: "786235743780",
  appId: "1:786235743780:web:61b01fb9d94bdf2225c2b1",
};

const app = initializeApp(firebaseConfig); //Firebase initialization

export const auth = getAuth(app); //Authentication-specific function
