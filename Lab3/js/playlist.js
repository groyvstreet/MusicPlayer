import { user } from './app.js';
import { renderTracks } from './tracks.js';
import { deletePlaylist } from './api/playlists.js';
import { updateUserPlaylistsAmount } from './api/users.js';

const id = window.location.href.split('#')[1];

user.then((u) => {
    const playlist = u.playlists[id];

    if (playlist.tracks == undefined) {
        playlist.tracks = [];
    }

    document.getElementById('preview-image').src = playlist.image;
    document.getElementById('preview-h1').innerHTML = playlist.title;
    document.getElementById('preview-h2').innerHTML = `Треки: ${playlist.tracksAmount}`;
    document.getElementById('preview-h3').innerHTML = playlist.description;
    document.getElementById('preview-button-edit').href = `playlist_edit.html#${playlist.id}`;

    renderTracks(u, playlist.tracks);

    function searchTracks(event) {
        const input = event.target.value.toLowerCase().trim();
        let searchedTracks = playlist.tracks.filter(track => track.title.toLowerCase().includes(input));
        renderTracks(u, searchedTracks);
    }

    document.getElementById('search').addEventListener('input', searchTracks);

    async function deleteButtonOnClick() {
        const response = await deletePlaylist(u.id, playlist.id);
        
        await updateUserPlaylistsAmount(u.id, Object.values(u.playlists).length - 1);
        
        if (response.ok) {
            window.location.href = 'playlists.html';
        }
    }

    document.getElementById('preview-button-delete').addEventListener('click', deleteButtonOnClick);
});
