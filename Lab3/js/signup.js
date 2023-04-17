import { isAuthenticated } from "./app.js";
import { signUp } from "./api/users.js";

if (isAuthenticated()) {
    window.location.href = "index.html";
}

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

function emailInput(event) {
    email = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
}

function usernameInput(event) {
    username = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
}

function birthdayInput(event) {
    birthday = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
}

function passwordInput(event) {
    password = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
}

function passwordConfirmationInput(event) {
    passwordConfirmation = event.target.value;
    updateInputs();
    document.getElementById('signup-button').disabled = !isValid();
}

async function signupButtonOnClick(event) {
    event.preventDefault();
    const isArtist = document.getElementById('signup-input-is-artist').checked;

    const uid = await signUp(email, password, username, birthday, isArtist);
    
    if (uid == null) {
        document.getElementById('signup-input-email').style.borderColor = 'red';
    } else {
        document.cookie = `user=${uid}`;
        
        if (isArtist) {
            document.cookie = 'role=artist';
        } else {
            document.cookie = 'role=default';
        }

        window.location.href = 'index.html';
    }
}

document.getElementById('signup-input-email').addEventListener('input', emailInput);
document.getElementById('signup-input-username').addEventListener('input', usernameInput);
document.getElementById('signup-input-birthday').addEventListener('input', birthdayInput);
document.getElementById('signup-input-password').addEventListener('input', passwordInput);
document.getElementById('signup-input-password-confirmation').addEventListener('input', passwordConfirmationInput);
document.getElementById('signup-button').addEventListener('click', signupButtonOnClick);
