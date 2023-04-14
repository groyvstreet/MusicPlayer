import { user } from './app.js';
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

let id = window.location.href.split('#')[1];

user.then((u) => {
    let playlist = u.playlists[id];
    document.getElementById('preview-image').src = playlist.image;
    document.getElementById('playlist-title').value = playlist.title;
    document.getElementById('playlist-description').value = playlist.description;

    document.getElementById('playlist-button-save').addEventListener('click', async (event) => {
        event.preventDefault();
        playlist.title = document.getElementById('playlist-title').value;
        playlist.description = document.getElementById('playlist-description').value;

        const storage = getStorage(app);
        const storageRef = ref(storage, `img/playlists/${playlist.id}`);
        const file = document.getElementById('playlist-input-image').files[0];
        uploadBytes(storageRef, file).then(async () => {
            playlist.image = `https://firebasestorage.googleapis.com/v0/b/krakensound-ee3a2.appspot.com/o/img%2Fplaylists%2F${playlist.id}?alt=media`;

            let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/playlists/${id}.json`, {
            method: 'put',
            body: JSON.stringify(playlist)
            });

            if (response.ok) {
                window.location.href = `playlist.html#${id}`;
            }
        });
    });

    document.getElementById('playlist-input-image').addEventListener('change', () => {
        const files = document.getElementById('playlist-input-image').files;
        if (FileReader && files && files.length) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                document.getElementById('preview-image').src = fileReader.result;
            };
            fileReader.readAsDataURL(files[0]);
        }
    });
});
