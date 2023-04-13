import { user } from './app.js';
import { getTracks } from './tracks.js';

let allTracks = [];

function loadTracks() {
    fetch('https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json')
        .then((response) => response.json())
        .then((data) => {
            let albums = Object.values(data);
            albums.map((album) => {
                allTracks = allTracks.concat(album.tracks);
            });

            user.then((u) => {
                getTracks(u, allTracks);
            });
        });
}

loadTracks();

document.getElementById('search').addEventListener('change', (event) => {
    let searchedTracks = allTracks.filter((track) => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(searchedTracks);
});
