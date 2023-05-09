// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq7h25weL1Doh8AFbSc7q2y7BClFqjDfU",
  authDomain: "yummyfoodapp-502fa.firebaseapp.com",
  projectId: "yummyfoodapp-502fa",
  storageBucket: "yummyfoodapp-502fa.appspot.com",
  messagingSenderId: "411362891552",
  appId: "1:411362891552:web:cfcd4fd519eb87627a2945",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
