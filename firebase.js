import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDVbGHyoM8e2-6RzlS-UYbqb8eLz0SuAAo",
    authDomain: "hirely-b291c.firebaseapp.com",
    projectId: "hirely-b291c",
    storageBucket: "hirely-b291c.appspot.com",
    messagingSenderId: "705941731328",
    appId: "1:705941731328:web:e906c5fd0bb02ca26280e5",
    measurementId: "G-TBM2RFRSYZ"
};

const app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app()
}

const db = app.firestore()