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

const borderColor = document.getElementById('signin-input-email').style.borderColor;
let email = '';
let password = '';

function isValid() {
    return email.length != 0 && password.length != 0;
}

function updateInputs() {
    if (email.length == 0) {
        document.getElementById('signin-input-email').style.borderColor = 'red';
    } else {
        document.getElementById('signin-input-email').style.borderColor = borderColor;
    }

    if (password.length == 0) {
        document.getElementById('signin-input-password').style.borderColor = 'red';
    } else {
        document.getElementById('signin-input-password').style.borderColor = borderColor;
    }
}

document.getElementById('signin-input-email').addEventListener('input', (event) => {
    email = event.target.value;
    updateInputs();
    document.getElementById('signin-button').disabled = !isValid();
});

document.getElementById('signin-input-password').addEventListener('input', (event) => {
    password = event.target.value;
    updateInputs();
    document.getElementById('signin-button').disabled = !isValid();
});

document.getElementById('signin-button').addEventListener('click', (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${user.uid}.json`)
                .then((response) => response.json())
                .then((data) => {
                    document.cookie = `user=${user.uid}`;

                    if (data.artistId == undefined) {
                        document.cookie = 'role=default';
                    } else {
                        document.cookie = 'role=artist';
                    }
                    
                    window.location.href = 'index.html';
                });
        })
        .catch((error) => {
            document.getElementById('signin-input-email').style.borderColor = 'red';
            document.getElementById('signin-input-password').style.borderColor = 'red';

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});
