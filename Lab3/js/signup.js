import { isAuthenticated } from "./app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const USERNAME_REGEXP = /^[a-zA-Zа-яА-Я0-9+]+$/ui;

const borderColor = document.getElementById('signup-input-email').style.borderColor;
const placeholder = document.getElementById('signup-input-password').placeholder;
let email = '';
let username = '';
let birthday = '';
let password = '';
let passwordConfirmation = '';

function isEmailValid() {
    return EMAIL_REGEXP.test(email);
}

function isUsernameValid() {
    return USERNAME_REGEXP.test(username);
}

function isBirthdayValid() {
    return birthday.length != 0;
}

function isPasswordValid() {
    return password.length >= 6 && password.length <= 50;
}

function isPasswordConfirmationValid() {
    return passwordConfirmation == password && password.length != 0;
}

function isValid() {
    return isEmailValid() && isUsernameValid() && isPasswordValid() && isPasswordConfirmationValid();
}

function updateInputs() {
    if (isEmailValid()) {
        document.getElementById('signup-input-email').style.borderColor = borderColor;
    } else {
        document.getElementById('signup-input-email').style.borderColor = 'red';
    }

    if (isUsernameValid()) {
        document.getElementById('signup-input-username').style.borderColor = borderColor;
    } else {
        document.getElementById('signup-input-username').style.borderColor = 'red';
    }

    if (isBirthdayValid()) {
        document.getElementById('signup-input-birthday').style.borderColor = borderColor;
    } else {
        document.getElementById('signup-input-birthday').style.borderColor = 'red';
    }

    if (isPasswordValid()) {
        document.getElementById('signup-input-password').style.borderColor = borderColor;
        document.getElementById('signup-input-password').placeholder = placeholder;
    } else {
        document.getElementById('signup-input-password').style.borderColor = 'red';
        document.getElementById('signup-input-password').placeholder = placeholder + ' (6-50)';
    }

    if (isPasswordConfirmationValid()) {
        document.getElementById('signup-input-password-confirmation').style.borderColor = borderColor;
    } else {
        document.getElementById('signup-input-password-confirmation').style.borderColor = 'red';
    }
}

document.getElementById('signup-input-email').addEventListener('input', (event) => {
    email = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
});

document.getElementById('signup-input-username').addEventListener('input', (event) => {
    username = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
});

document.getElementById('signup-input-birthday').addEventListener('input', (event) => {
    birthday = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
});

document.getElementById('signup-input-password').addEventListener('input', (event) => {
    password = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
});

document.getElementById('signup-input-password-confirmation').addEventListener('input', (event) => {
    passwordConfirmation = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
});

document.getElementById('signup-button').addEventListener('click', (event) => {
    event.preventDefault();
    if (document.getElementById('signup-input-is-artist').value) {
        const artistId = crypto.randomUUID();

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
                        playlistsAmount: 0,
                        artistId: artistId
                    })
                }).then((response) => {
                    if (response.ok) {
                        fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists/${artistId}.json`, {
                            method: 'put',
                            body: JSON.stringify({
                                id: artistId,
                                image: 'img/blank-profile-picture.svg',
                                nickname: username,
                                tracksAmount: 0
                            })
                        }).then((response) => {
                            if (response.ok) {
                                document.cookie = `user=${user.uid}`;
                                document.cookie = 'role=artist';
                                window.location.href = 'index.html';
                            }
                        });
                    }
                });
            })
            .catch((error) => {
                document.getElementById('signup-input-email').style.borderColor = 'red';

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
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
                        document.cookie = 'role=default';
                        window.location.href = 'index.html';
                    }
                });
            })
            .catch((error) => {
                document.getElementById('signup-input-email').style.borderColor = 'red';

                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
});
