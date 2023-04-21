import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAMUPkqFeqdJiMG2j2awctJbBoKUpNmKc0",
    authDomain: "krakensound-ee3a2.firebaseapp.com",
    projectId: "krakensound-ee3a2",
    storageBucket: "krakensound-ee3a2.appspot.com",
    messagingSenderId: "383353070589",
    appId: "1:383353070589:web:fb0cd035182441acdfaf94"
};

const app = initializeApp(firebaseConfig);

async function addProfileImage(userId, file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `img/profiles/${userId}`);
    return await uploadBytes(storageRef, file);
}

async function addPlaylistImage(playlistId, file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `img/playlists/${playlistId}`);
    return await uploadBytes(storageRef, file);
}

async function addAlbumImage(albumId, file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `img/albums/${albumId}`);
    return await uploadBytes(storageRef, file);
}

async function addTrackFile(trackId, file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, `tracks/${trackId}`);
    return await uploadBytes(storageRef, file);
}

export { addProfileImage, addPlaylistImage, addAlbumImage, addTrackFile }
