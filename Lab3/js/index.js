import { user } from './app.js';
import { renderTracks } from './tracks.js';
import { getAlbums } from './api/albums.js';

async function loadTracks() {
    let albums = await getAlbums();
    albums = Object.values(albums);

    let allTracks = [];

    albums.map((album) => {
        allTracks = allTracks.concat(album.tracks);
    });

    user.then((u) => {
        renderTracks(u, allTracks);

        function searchTracks(event) {
            const input = event.target.value.toLowerCase().trim();
            const searchedTracks = allTracks.filter((track) => track.title.toLowerCase().includes(input));
            renderTracks(u, searchedTracks);
        }

        document.getElementById('search').addEventListener('input', searchTracks);
    });
}

loadTracks();
