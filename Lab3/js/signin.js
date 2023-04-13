import { isAuthenticated } from "./app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

if (isAuthenticated()) {
    window.location.href = "index.html";
}

const firebaseConfig = {
    apiKey: "AIzaSyAMUPkqFeqdJiMG2j2awctJbBoKUpNmKc0",
    authDomain: "krakensound-ee3a2.firebaseapp.com",
    projectId: "krakensound-ee3a2",
    storageBucket: "krakensound-ee3a2.appspot.com",
    messagingSenderId: "383353070589",
    appId: "1:383353070589:web:fb0cd035182441acdfaf94"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let email;
let password;

document.getElementById('signin-input-email').addEventListener('change', (event) => {
    email = event.target.value;
});

document.getElementById('signin-input-password').addEventListener('change', (event) => {
    password = event.target.value;
});

document.getElementById('signin-button').addEventListener('click', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            document.cookie = `user=${user.uid}`;
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});
