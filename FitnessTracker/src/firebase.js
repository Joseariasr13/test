import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZn131sr3x_2fYz44NVC3q0afciRnEUq8", // Revisa este valor
    authDomain: "fitnesstracker-49346.firebaseapp.com", // Revisa este valor
    projectId: "fitnesstracker-49346", // Revisa este valor
    storageBucket: "fitnesstracker-49346.firebasestorage.app", // Revisa este valor
    messagingSenderId: "740634543322", // Revisa este valor
    appId: "1:740634543322:web:968c01ac2d105aeee2d1e3", // Revisa este valor
    measurementId: "G-0HQ1HE8VRV" // Revisa este valor
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener una referencia a Firestore
const db = getFirestore(app);

export { db };