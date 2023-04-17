import { signIn } from "./api/users.js";
import { isAuthenticated } from "./app.js";

if (isAuthenticated()) {
    window.location.href = "index.html";
}

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

function emailInput(event) {
    email = event.target.value;
    updateInputs();
    document.getElementById('signin-button').disabled = !isValid();
}

function passwordInput(event) {
    password = event.target.value;
    updateInputs();
    document.getElementById('signin-button').disabled = !isValid();
}

async function signinButtonOnClick(event) {
    event.preventDefault();

    const user = await signIn(email, password);
    
    document.cookie = `user=${user.id}`;

    if (user.artistId == undefined) {
        document.cookie = 'role=default';
    } else {
        document.cookie = 'role=artist';
    }
    
    window.location.href = 'index.html';
}

document.getElementById('signin-input-email').addEventListener('input', emailInput);
document.getElementById('signin-input-password').addEventListener('input', passwordInput);
document.getElementById('signin-button').addEventListener('click', signinButtonOnClick);
