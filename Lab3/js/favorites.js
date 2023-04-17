import { isAuthenticated, user } from './app.js';
import { renderTracks } from './tracks.js';

if (isAuthenticated()) {
    user.then((u) => {
        renderTracks(u, u.favoriteTracks);

        function searchTracks(event) {
            const input = event.target.value.toLowerCase().trim();
            let searchedTracks = u.favoriteTracks.filter(track => track.title.toLowerCase().includes(input));
            renderTracks(u, searchedTracks);
        }

        document.getElementById('search').addEventListener('input', searchTracks);
    });
} else {
    window.location.href = 'signin.html';
}
