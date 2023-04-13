//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
// import { getAuth } from "firebase/auth";
// import firebase from "firebase/app";
// import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAMUPkqFeqdJiMG2j2awctJbBoKUpNmKc0",
    authDomain: "krakensound-ee3a2.firebaseapp.com",
    projectId: "krakensound-ee3a2",
    storageBucket: "krakensound-ee3a2.appspot.com",
    messagingSenderId: "383353070589",
    appId: "1:383353070589:web:fb0cd035182441acdfaf94"
};

//const app = initializeApp(firebaseConfig);
//const auth = getAuth(app);
//firebase.initializeApp(firebaseConfig);
//const auth = firebase.auth();

localStorage.setItem('user_id', 'ebac5a1a-d920-11ed-afa1-0242ac120002');

async function loadUser() {
    let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`);
    let user = await response.json();

    if (user.favoriteTracks == undefined) {
        user.favoriteTracks = [];
    } else {
        user.favoriteTracks = Object.values(user.favoriteTracks);
    }

    if (user.playlists == undefined) {
        user.playlists = [];
    }

    return user;
}

let user = loadUser();
