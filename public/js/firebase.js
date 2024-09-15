// firebase.js

// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9GQOtuqi7EB_mud57UjxYylLxrrlMiXk",
    authDomain: "web-profile-rb.firebaseapp.com",
    databaseURL: "https://web-profile-rb-default-rtdb.firebaseio.com",
    projectId: "web-profile-rb",
    storageBucket: "web-profile-rb.appspot.com",
    messagingSenderId: "1083266735534",
    appId: "1:1083266735534:web:3b993e9be258b2b0367c3f",
    measurementId: "G-NC4XWE04J6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export the initialized database for use in other modules
export { database };
