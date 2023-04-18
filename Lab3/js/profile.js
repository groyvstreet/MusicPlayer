import { isAuthenticated, user } from './app.js';
import { putUser } from './api/users.js';
import { addProfileImage } from './api/files.js';
import { updateArtist, getArtist } from './api/artists.js';

function logout() {
    document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'role=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    window.location.href = 'index.html';
}

function updateProfileImage() {
    const files = document.getElementById('profile-input-image').files;

    if (FileReader && files && files.length) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            document.getElementById('profile-image').src = fileReader.result;
        };
        fileReader.readAsDataURL(files[0]);
    }
}

if (!isAuthenticated()) {
    window.location.href = 'signin.html';
} else {
    user.then((u) => {
        async function saveChanges(event) {
            event.preventDefault();

            u.username = document.getElementById('profile-input-username').value;
            u.birthday = document.getElementById('profile-input-birthday').value;

            const file = document.getElementById('profile-input-image').files[0];

            if (file != undefined) {
                await addProfileImage(u.id, file);

                u.avatar = `https://firebasestorage.googleapis.com/v0/b/krakensound-ee3a2.appspot.com/o/img%2Fprofiles%2F${u.id}?alt=media`;
            }

            let response = await putUser(u);

            if (localStorage.getItem('user_role') == 'artist') {
                const artist = await getArtist(u.artistId);
                artist.nickname = u.username;

                if (file != undefined) {
                    artist.image = u.avatar;
                }

                response = await updateArtist(artist);
            }

            if (response.ok) {
                alert('Изменения сохранены');
            }
        }

        document.getElementById('profile-image').src = u.avatar;
        document.getElementById('profile-input-email').value = u.email;
        document.getElementById('profile-input-username').value = u.username;
        document.getElementById('profile-input-birthday').value = u.birthday.substring(0, 10);
        document.getElementById('profile-span-tracks').innerHTML = 'Любимые треки: ' + u.favoriteTracksAmount;
        document.getElementById('profile-span-playlists').innerHTML = 'Плейлисты: ' + u.playlistsAmount;
    
        document.getElementById('profile-button-save').addEventListener('click', saveChanges);
        document.getElementById('profile-button-logout').addEventListener('click', logout);
        document.getElementById('profile-input-image').addEventListener('change', updateProfileImage);
    });
}
