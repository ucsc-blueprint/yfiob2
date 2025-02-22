// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxq73CeS0qBuvys639Tv-OB5BDJxpu73c",
  authDomain: "yfiob2.firebaseapp.com",
  projectId: "yfiob2",
  storageBucket: "yfiob2.firebasestorage.app",
  messagingSenderId: "893610088121",
  appId: "1:893610088121:web:f3c9f9f6677d84ee9dad68",
  measurementId: "G-06T4YREEV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);