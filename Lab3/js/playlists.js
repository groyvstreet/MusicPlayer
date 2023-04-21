import { isAuthenticated, user } from './app.js';
import { addPlaylist } from './api/playlists.js';
import { updateUserPlaylistsAmount } from './api/users.js';
import { playlistComponent } from './components/playlistComponent.js';
import { virtualizationComponent } from './components/virtualizationComponent.js';
import { loadingComponent } from './components/loadingComponent.js';

if (!isAuthenticated()) {
    window.location.href = 'signin.html';
}

function renderPlaylists(playlists) {
    document.getElementById('cards').replaceChildren();
    virtualizationComponent(document.getElementById('cards'), playlists, playlistComponent, []);
}

async function loadPlaylists() {
    const currentUser = await user;

    const playlists = Object.values(currentUser.playlists);
    renderPlaylists(playlists);

    function searchPlaylists(event) {
        const input = event.target.value.toLowerCase().trim();
        const searchedPlaylists = playlists.filter(playlist => playlist.title.toLowerCase().includes(input));
        renderPlaylists(searchedPlaylists);
    }

    document.getElementById('search').addEventListener('input', searchPlaylists);

    async function createPlaylist() {
        if (isAuthenticated()) {
            const response = await addPlaylist(currentUser.id);

            await updateUserPlaylistsAmount(currentUser.id, Object.values(currentUser.playlists).length + 1);
    
            if (response.ok) {
                const id = response.url.split('/').pop().split('.')[0]
                window.location.href = `playlist.html#${id}`;
            }
        } else {
            window.location.href = 'signin.html';
        }
    }

    async function createButtonOnClick() {
        loadingComponent(createPlaylist);
    }
    
    document.getElementById('playlist-button-create').addEventListener('click', createButtonOnClick);
}

loadingComponent(loadPlaylists);
