import firebase from "firebase/compat/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDVbGHyoM8e2-6RzlS-UYbqb8eLz0SuAAo",
    authDomain: "hirely-b291c.firebaseapp.com",
    projectId: "hirely-b291c",
    storageBucket: "hirely-b291c.appspot.com",
    messagingSenderId: "705941731328",
    appId: "1:705941731328:web:e906c5fd0bb02ca26280e5",
    measurementId: "G-TBM2RFRSYZ"
};

firebase.initializeApp(firebaseConfig)

//initializing servive
const db = getFirestore()

export { db }