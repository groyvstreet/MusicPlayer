import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
let username;
let birthday;
let password;
let passwordConfirmation;

document.getElementById('signup-input-email').addEventListener('change', (event) => {
    email = event.target.value;
});

document.getElementById('signup-input-username').addEventListener('change', (event) => {
    username = event.target.value;
});

document.getElementById('signup-input-birthday').addEventListener('change', (event) => {
    birthday = event.target.value;
});

document.getElementById('signup-input-password').addEventListener('change', (event) => {
    password = event.target.value;
});

document.getElementById('signup-input-password-confirmation').addEventListener('change', (event) => {
    passwordConfirmation = event.target.value;
});

document.getElementById('signup-button-create').addEventListener('click', (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            
            fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${user.uid}.json`, {
                method: 'put',
                body: JSON.stringify({
                    id: user.uid,
                    avatar: 'img/blank-profile-picture.svg',
                    email: email,
                    username: username,
                    birthday: birthday,
                    favoriteTracksAmount: 0,
                    playlistsAmount: 0
                })
            }).then((response) => {
                if (response.ok) {
                    document.cookie = `user=${user.uid}`;
                    window.location.href = 'index.html';
                }
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
});
