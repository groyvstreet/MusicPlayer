import { user } from './app.js';
import { renderTracks } from './tracks.js';
import { getAlbum } from './api/albums.js';
import { loadingComponent } from './components/loadingComponent.js';

const id = window.location.href.split('#')[1];

async function loadAlbum() {
    const album = await getAlbum(id);

    document.getElementById('preview-image').src = album.image;
    document.getElementById('preview-h1').innerHTML = album.title;
    document.getElementById('preview-h2').innerHTML = `Треки: ${album.tracksAmount}`;
    document.getElementById('preview-h3').innerHTML = album.type;

    user.then((u) => {
        function searchTracks(event) {
            const input = event.target.value.toLowerCase().trim();
            let searchedTracks = album.tracks.filter(track => track.title.toLowerCase().includes(input));
            renderTracks(u, searchedTracks);
        }

        renderTracks(u, album.tracks);

        document.getElementById('search').addEventListener('input', searchTracks);
    });
}

loadingComponent(loadAlbum);
