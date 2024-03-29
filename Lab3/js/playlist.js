import { user } from './app.js';
import { renderTracks } from './tracks.js';
import { deletePlaylist } from './api/playlists.js';
import { updateUserPlaylistsAmount } from './api/users.js';
import { loadingComponent } from './components/loadingComponent.js';

async function loadPlaylist(id) {
    const currentUser = await user;

    const playlist = currentUser.playlists[id];
    
        if (playlist.tracks == undefined) {
            playlist.tracks = {};
        }
    
        document.getElementById('preview-image').src = playlist.image;
        document.getElementById('preview-h1').innerHTML = playlist.title;
        document.getElementById('preview-h2').innerHTML = `Треки: ${playlist.tracksAmount}`;
        document.getElementById('preview-h3').innerHTML = playlist.description;
        document.getElementById('preview-button-edit').href = `playlist_edit.html#${playlist.id}`;
    
        renderTracks(currentUser, Object.values(playlist.tracks));
    
        function searchTracks(event) {
            const input = event.target.value.toLowerCase().trim();
            let searchedTracks = Object.values(playlist.tracks).filter(track => track.title.toLowerCase().includes(input));
            renderTracks(currentUser, searchedTracks);
        }
    
        document.getElementById('search').addEventListener('input', searchTracks);
    
        async function deletePlaylistWithUpdatingUser() {
            const response = await deletePlaylist(currentUser.id, playlist.id);
            
            await updateUserPlaylistsAmount(currentUser.id, Object.values(currentUser.playlists).length - 1);
            
            if (response.ok) {
                window.location.href = 'playlists.html';
            }
        }
    
        async function deleteButtonOnClick() {
            loadingComponent(deletePlaylistWithUpdatingUser);
        }
    
        document.getElementById('preview-button-delete').addEventListener('click', deleteButtonOnClick);
}

const id = window.location.href.split('#')[1];
loadingComponent(loadPlaylist, [id]);
