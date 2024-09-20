// login.js

// Import the auth from firebase.js
import { auth } from './firebase.js';

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to the edit page upon successful login
        window.location.href = 'admin.html';
    } catch (error) {
        errorMessage.textContent = error.message;
    }
});
