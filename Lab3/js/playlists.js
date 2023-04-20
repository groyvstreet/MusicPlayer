import { isAuthenticated, user } from './app.js';
import { updatePlayerTracks } from './player.js';
import { addPlaylist } from './api/playlists.js';
import { updateUserPlaylistsAmount } from './api/users.js';

if (!isAuthenticated()) {
    window.location.href = 'signin.html';
}

function renderPlaylists(playlists) {
    function playPlaylist(playlist) {
        if (playlist.tracks != undefined) {
            const tracks = Object.values(playlist.tracks);
            updatePlayerTracks(tracks, tracks[0]);
        }
    }

    document.getElementById('cards').innerHTML = playlists.map((playlist) => {
        return `
            <li class="cards__card">
                <a class="cards__a" href="playlist.html#${playlist.id}">
                    <section class="card">
                        <img class="cover-image" src="${playlist.image}">
                        <div class="card__description">
                            <p class="title">${playlist.title}</p>
                            <p class="info-p">${playlist.tracksAmount} треки</p>
                        </div>
                        <div class="card__buttons">
                            <button class="icon-button icon-button_size_small" id="playlist-button-play-${playlist.id}">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');

    playlists.forEach((playlist) => {
        document.getElementById(`playlist-button-play-${playlist.id}`).addEventListener('click', (event) => {
            event.preventDefault();
            
            playPlaylist(playlist);
        });
    });
}

user.then((u) => {
    const playlists = Object.values(u.playlists);
    renderPlaylists(playlists);

    function searchPlaylists(event) {
        const input = event.target.value.toLowerCase().trim();
        const searchedPlaylists = playlists.filter(playlist => playlist.title.toLowerCase().includes(input));
        renderPlaylists(searchedPlaylists);
    }

    document.getElementById('search').addEventListener('input', searchPlaylists);

    async function createButtonOnClick() {
        if (isAuthenticated()) {
            const response = await addPlaylist(u.id);

            await updateUserPlaylistsAmount(u.id, Object.values(u.playlists).length + 1);
    
            if (response.ok) {
                const id = response.url.split('/').pop().split('.')[0]
                window.location.href = `playlist.html#${id}`;
            }
        } else {
            window.location.href = 'signin.html';
        }
    }
    
    document.getElementById('playlist-button-create').addEventListener('click', createButtonOnClick);
});
