// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVKYJ3syMM2Li31jPbpNb13siMKNWptjI",
  authDomain: "shoppers-529c9.firebaseapp.com",
  projectId: "shoppers-529c9",
  storageBucket: "shoppers-529c9.firebasestorage.app",
  messagingSenderId: "963413293362",
  appId: "1:963413293362:web:6d0cf631f29c5ab6e8ff2b",
  measurementId: "G-VG7PLDXLC6",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { db };
