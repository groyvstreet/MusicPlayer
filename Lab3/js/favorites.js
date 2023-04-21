import { isAuthenticated, user } from './app.js';
import { loadingComponent } from './components/loadingComponent.js';
import { renderTracks } from './tracks.js';

async function loadFavorites() {
    if (isAuthenticated()) {
        const currentUser = await user;

        renderTracks(currentUser, currentUser.favoriteTracks);
    
        function searchTracks(event) {
            const input = event.target.value.toLowerCase().trim();
            let searchedTracks = u.favoriteTracks.filter(track => track.title.toLowerCase().includes(input));
            renderTracks(currentUser, searchedTracks);
        }

        document.getElementById('search').addEventListener('input', searchTracks);
    } else {
        window.location.href = 'signin.html';
    }
}

loadingComponent(loadFavorites);
