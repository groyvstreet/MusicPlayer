import { isAuthenticated, user } from './app.js';
import { updatePlayerTracks } from './player.js';

let playlists = [];

// function playPlaylist(id) {
//     let playlist = playlists.filter(playlist => playlist.id == id)[0];

//     if (playlist.tracks.length != 0) {
//         updatePlayerTracks(playlist.tracks, playlist.tracks[0]);
//     }
//     // currentTracks = playlist.tracks;
//     // trackIndex = 0;
//     // audio.src = currentTracks[trackIndex].src;
//     // isTrackPlaying = false;
//     // updatePlayerImagePlay();
//     // isTrackPlaying = true;
//     // audio.play();
// }

function getPlaylists(playlists) {
    document.getElementById('cards').innerHTML = playlists.map(function (playlist) {
        return `
            <li class="cards__card">
                <a class="cards__a" href="playlist.html#${playlist.id}">
                    <section class="card">
                        <img class="cover-image" src="${playlist.image}">
                        <div class="card__description">
                            <p class="title">${playlist.title}</p>
                            <p class="info">${playlist.tracksAmount} треки</p>
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
            //let track = tracks.filter(track => track.id == id)[0];
            event.preventDefault();
            if (playlist.tracks != undefined) {
                updatePlayerTracks(playlist.tracks, playlist.tracks[0]);
            }
        });
    });
}

user.then((u) => {
    playlists = playlists.concat(Object.values(u.playlists));
    getPlaylists(playlists);
});

document.getElementById('search').addEventListener('change', (event) => {
    let searchedPlaylists = playlists.filter(playlist => playlist.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getPlaylists(searchedPlaylists);
});

document.getElementById('playlist-button-create').addEventListener('click', async () => {
    if (isAuthenticated) {
        let newPlaylistId = crypto.randomUUID();
        let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/playlists/${newPlaylistId}.json`, {
            method: 'put',
            body: JSON.stringify({
                id: newPlaylistId,
                title: 'Плейлист',
                description: '',
                image: 'img/cover-image.jpg',
                tracksAmount: 0
            })
        });

        if (response.ok) {
            window.location.href = `playlist.html#${newPlaylistId}`;
        }
    } else {
        window.location.href = 'signin.html';
    }
});
