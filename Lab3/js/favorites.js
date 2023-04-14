import { isAuthenticated, user } from './app.js';
import { getTracks } from './tracks.js';

if (isAuthenticated()) {
    user.then((u) => {
        getTracks(u, u.favoriteTracks);

        document.getElementById('search').addEventListener('input', (event) => {
            const input = event.target.value.toLowerCase().trim();
            let searchedTracks = u.favoriteTracks.filter(track => track.title.toLowerCase().includes(input));
            getTracks(u, searchedTracks);
        });
    });
} else {
    window.location.href = 'signin.html';
}
