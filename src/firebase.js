import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyB6O_JdB5lJ5BWMf30H1fM5w7WM2X5pi7Y",
    authDomain: "bookcatalog-97c27.firebaseapp.com",
    projectId: "bookcatalog-97c27",
    storageBucket: "bookcatalog-97c27.appspot.com",
    messagingSenderId: "443283359493",
    appId: "1:443283359493:web:1452d19fce4eaee770196c",
    measurementId: "G-SWRC02TSP0"
  };

const firebaseApp=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export const auth = firebaseApp.auth();
export default db;
