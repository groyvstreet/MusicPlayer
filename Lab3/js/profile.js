import { isAuthenticated, user } from './app.js';
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

if (!isAuthenticated()) {
    window.location.href = 'signin.html';
} else {
    user.then((u) => {
        document.getElementById('profile-image').src = u.avatar;
        document.getElementById('profile-input-email').value = u.email;
        document.getElementById('profile-input-username').value = u.username;
        document.getElementById('profile-input-birthday').value = u.birthday.substring(0, 10);
        document.getElementById('profile-span-tracks').innerHTML = 'Любимые треки: ' + u.favoriteTracksAmount;
        document.getElementById('profile-span-playlists').innerHTML = 'Плейлисты: ' + u.playlistsAmount;
    
        document.getElementById('profile-button-save').addEventListener('click', async (event) => {
            event.preventDefault();
            u.username = document.getElementById('profile-input-username').value;
            u.birthday = document.getElementById('profile-input-birthday').value;

            const storage = getStorage(app);
            const storageRef = ref(storage, `img/profiles/${localStorage.getItem('user_id')}`);
            const file = document.getElementById('profile-input-image').files[0];
            uploadBytes(storageRef, file).then(async () => {
                u.avatar = `https://firebasestorage.googleapis.com/v0/b/krakensound-ee3a2.appspot.com/o/img%2Fprofiles%2F${u.id}?alt=media`;
                
                let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`, {
                    method: 'put',
                    body: JSON.stringify(u)
                });
        
                if (response.ok) {
                    alert('Изменения сохранены');
                }
            });
        });

        document.getElementById('profile-button-logout').addEventListener('click', () => {
            document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            window.location.href = 'index.html';
        });

        document.getElementById('profile-input-image').addEventListener('change', () => {
            const files = document.getElementById('profile-input-image').files;
            if (FileReader && files && files.length) {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                    document.getElementById('profile-image').src = fileReader.result;
                };
                fileReader.readAsDataURL(files[0]);
            }
        });
    });
}
