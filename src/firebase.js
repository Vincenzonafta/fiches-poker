import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC2jHR1LKmZqWDgmsBoVEdRCiAa3xViOp8",
    authDomain: "fiches-poker.firebaseapp.com",
    databaseURL: "https://fiches-poker-default-rtdb.firebaseio.com",
    projectId: "fiches-poker",
    storageBucket: "fiches-poker.firebasestorage.app",
    messagingSenderId: "944290602644",
    appId: "1:944290602644:web:a78dc71eff0c90f1a21e81"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, onValue, set };
