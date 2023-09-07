// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8spwlE6mGAAAcjPlVfeYuh-zUr9Qk3UA",
  authDomain: "watchmovie-defe3.firebaseapp.com",
  projectId: "watchmovie-defe3",
  storageBucket: "watchmovie-defe3.appspot.com",
  messagingSenderId: "947000492443",
  appId: "1:947000492443:web:d5d230394ee7c60417e13e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);