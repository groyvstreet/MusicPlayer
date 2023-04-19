import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { addArtist } from "./artists.js";

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

async function putUser(user) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${user.id}.json`, {
        method: 'put',
        body: JSON.stringify(user)
    });
}

async function getUser(id) {
    const response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${id}.json`);
    return response.json();
}

async function updateUserFavoriteTracksAmount(user) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${user.id}/favoriteTracksAmount.json`, {
        method: 'put',
        body: JSON.stringify(user.favoriteTracks.length)
    });
}

async function updateUserPlaylistsAmount(user) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${user.id}/playlistsAmount.json`, {
        method: 'put',
        body: JSON.stringify(user.playlists.length)
    });
}

async function signIn(email, password) {
    const response = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUser(response.user.uid);
    return user;
}

async function addUser(id, email, username, birthday, isArtist) {
    const user = {
        id: id,
        avatar: 'img/blank-profile-picture.svg',
        email: email,
        username: username,
        birthday: birthday,
        favoriteTracksAmount: 0,
        playlistsAmount: 0
    };

    if (isArtist) {
        const artistId = crypto.randomUUID();
        user.artistId = artistId;
        await addArtist(artistId, username);
    }

    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${id}.json`, {
        method: 'put',
        body: JSON.stringify(user)
    });
}

async function signUp(email, password, username, birthday, isArtist) {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addUser(user.uid, email, username, birthday, isArtist);
        return user.uid;
    }
    catch(error) {
        return null;
    }
}

export { putUser, getUser, addUser, signIn, signUp, updateUserFavoriteTracksAmount, updateUserPlaylistsAmount }
