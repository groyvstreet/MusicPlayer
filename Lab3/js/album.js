import { user } from './app.js';
import { getTracks } from './tracks.js';

const id = window.location.href.split('#')[1];

function loadAlbum() {
    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums/${id}.json`)
        .then((response) => response.json())
        .then((album) => {
            document.getElementById('preview-image').src = album.image;
            document.getElementById('preview-h1').innerHTML = album.title;
            document.getElementById('preview-h2').innerHTML = `Треки: ${album.tracksAmount}`;
            document.getElementById('preview-h3').innerHTML = album.type;

            user.then((u) => {
                getTracks(u, album.tracks);

                document.getElementById('search').addEventListener('input', (event) => {
                    const input = event.target.value.toLowerCase().trim();
                    let searchedTracks = album.tracks.filter(track => track.title.toLowerCase().includes(input));
                    getTracks(u, searchedTracks);
                });
            });
        });
}

loadAlbum();
