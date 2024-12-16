// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYOpZvs7wkC7UjDPOe8hoMC-7kXJU8poo",
    authDomain: "toxicgamescommentbox.firebaseapp.com",
    projectId: "toxicgamescommentbox",
    databaseURL: "hhttps://toxicgamescommentbox-default-rtdb.firebaseio.com/",
    storageBucket: "toxicgamescommentbox.firebasestorage.app",
    messagingSenderId: "364633446060",
    appId: "1:364633446060:web:f6616790feb23143dc3109",
    measurementId: "G-8HYN0H15NJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child };
