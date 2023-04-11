let playlists = [];

function playPlaylist(id) {
    let playlist = playlists.filter(playlist => playlist.id == id)[0];
    currentTracks = playlist.tracks;
    trackIndex = 0;
    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function getPlaylists(playlists) {
    document.getElementById("cards").innerHTML = playlists.map(function (playlist) {
        return `
            <li class="cards__card">
                <a class="cards__a" href="playlist.html#${playlist.id}">
                    <section class="card">
                        <img class="cover-image" src="${playlist.image}">
                        <div class="card__description">
                            <p class="title">${playlist.title}</p>
                            <p class="info">${playlist.tracks_amount} треки</p>
                        </div>
                        <div class="card__buttons">
                            <button class="icon-button icon-button_size_small" onclick="playPlaylist(${playlist.id}); return false">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');
}

user.then((u) => {
    playlists = playlists.concat(u.playlists);
    getPlaylists(playlists);
});

document.getElementById("search").addEventListener("change", (event) => {
    let searchedPlaylists = playlists.filter(playlist => playlist.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getPlaylists(searchedPlaylists);
});
