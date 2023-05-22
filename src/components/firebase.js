// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAYw1eU2qCL1GfBwq2z8vA-aH5CtvLHrv8",
  authDomain: "movie-booking-a9f5d.firebaseapp.com",
  projectId: "movie-booking-a9f5d",
  storageBucket: "movie-booking-a9f5d.appspot.com",
  messagingSenderId: "424461216747",
  appId: "1:424461216747:web:6272636b70cd88aa7647ae",
  measurementId: "G-M1DZT2KEW6",
};

// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// export  { firebase, db };
// export const auth = firebase.auth();
export { db, auth };
