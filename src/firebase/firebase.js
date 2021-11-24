// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnQSBw6KefKMVcmFJA7v2u6JXVEKSS7IY",
  authDomain: "event-planning-5d9e6.firebaseapp.com",
  projectId: "event-planning-5d9e6",
  storageBucket: "event-planning-5d9e6.appspot.com",
  messagingSenderId: "799418461578",
  appId: "1:799418461578:web:4c8044aed97cd47ce1ac73",
  measurementId: "G-VPKR6E5SL3",
  databaseURL: 'https://event-planning-5d9e6-default-rtdb.firebaseio.com'
};

// Initialize Firebase

export const initializeFirebase = () => {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
};