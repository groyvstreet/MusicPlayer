import { user } from './app.js';
import { getTracks } from './tracks.js';

user.then((u) => {
    getTracks(u, u.favoriteTracks);
});

document.getElementById('search').addEventListener('change', (event) => {
    let searchedTracks = favoritesTracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(searchedTracks);
});
