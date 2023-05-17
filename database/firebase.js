// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASWP2ALIE6RPoITz56_wLvdH9yiFn7Pw0",
  authDomain: "proyecto07-85706.firebaseapp.com",
  projectId: "proyecto07-85706",
  storageBucket: "proyecto07-85706.appspot.com",
  messagingSenderId: "315138695282",
  appId: "1:315138695282:web:ca45dcea5a8839523b62eb",
  measurementId: "G-4YCSP7NG4J"
};

initializeApp(firebaseConfig)

export const database = getFirestore()