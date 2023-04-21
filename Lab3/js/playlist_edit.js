import { user } from './app.js';
import { addPlaylistImage } from './api/files.js';
import { updatePlaylist } from './api/playlists.js';
import { loadingComponent } from './components/loadingComponent.js';

const id = window.location.href.split('#')[1];

function updatePlaylistImage() {
    const files = document.getElementById('playlist-input-image').files;

    if (FileReader && files && files.length) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            document.getElementById('preview-image').src = fileReader.result;
        };
        fileReader.readAsDataURL(files[0]);
    }
}

async function loadPlaylist() {
    const currentUser = await user;

    async function saveChanges() {
        playlist.title = document.getElementById('playlist-title').value;
        playlist.description = document.getElementById('playlist-description').value;

        const file = document.getElementById('playlist-input-image').files[0];

        if (file != undefined) {
            await addPlaylistImage(playlist.id, file);

            playlist.image = `https://firebasestorage.googleapis.com/v0/b/krakensound-ee3a2.appspot.com/o/img%2Fplaylists%2F${playlist.id}?alt=media`;
        }

        const response = await updatePlaylist(currentUser.id, playlist)

        if (response.ok) {
            window.location.href = `playlist.html#${id}`;
        }
    }

    function playlistSaveButtonOnClick(event) {
        event.preventDefault();

        loadingComponent(saveChanges);
    }

    const playlist = currentUser.playlists[id];

    document.getElementById('preview-image').src = playlist.image;
    document.getElementById('playlist-title').value = playlist.title;
    document.getElementById('playlist-description').value = playlist.description;

    document.getElementById('playlist-button-save').addEventListener('click', playlistSaveButtonOnClick);
    document.getElementById('playlist-input-image').addEventListener('change', updatePlaylistImage);
}

loadingComponent(loadPlaylist);

// user.then((u) => {
//     async function saveChanges() {
//         playlist.title = document.getElementById('playlist-title').value;
//         playlist.description = document.getElementById('playlist-description').value;

//         const file = document.getElementById('playlist-input-image').files[0];

//         if (file != undefined) {
//             await addPlaylistImage(playlist.id, file);

//             playlist.image = `https://firebasestorage.googleapis.com/v0/b/krakensound-ee3a2.appspot.com/o/img%2Fplaylists%2F${playlist.id}?alt=media`;
//         }

//         const response = await updatePlaylist(u.id, playlist)

//         if (response.ok) {
//             window.location.href = `playlist.html#${id}`;
//         }
//     }

//     function playlistSaveButtonOnClick(event) {
//         event.preventDefault();

//         loadingComponent(saveChanges);
//     }

//     const playlist = u.playlists[id];

//     document.getElementById('preview-image').src = playlist.image;
//     document.getElementById('playlist-title').value = playlist.title;
//     document.getElementById('playlist-description').value = playlist.description;

//     document.getElementById('playlist-button-save').addEventListener('click', playlistSaveButtonOnClick);
//     document.getElementById('playlist-input-image').addEventListener('change', updatePlaylistImage);
// });
