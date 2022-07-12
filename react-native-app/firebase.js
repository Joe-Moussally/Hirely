import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDVbGHyoM8e2-6RzlS-UYbqb8eLz0SuAAo",
    authDomain: "hirely-b291c.firebaseapp.com",
    projectId: "hirely-b291c",
    storageBucket: "hirely-b291c.appspot.com",
    messagingSenderId: "705941731328",
    appId: "1:705941731328:web:e906c5fd0bb02ca26280e5",
    measurementId: "G-TBM2RFRSYZ"
};

const app = initializeApp(firebaseConfig)
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export { db };