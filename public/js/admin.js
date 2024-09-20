// admin.js

import { auth, database } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const editForm = document.getElementById('edit-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const logoutButton = document.getElementById('logout-button');

// Check authentication state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
    }
});

// Handle form submission to write data
editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newData = document.getElementById('data-field').value;
    const dbRef = ref(database, 'path/to/data'); // Replace with your actual path

    try {
        await set(dbRef, newData);
        successMessage.textContent = 'Data saved successfully!';
        errorMessage.textContent = '';
    } catch (error) {
        errorMessage.textContent = 'Error: ' + error.message;
        successMessage.textContent = '';
    }
});

// Handle logout
logoutButton.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error signing out: ' + error.message);
    }
});