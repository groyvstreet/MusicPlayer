import { updatePlayerTracks } from "../player.js";

function playlistComponent(playlist) {
    const element = document.createElement('li');

    function playPlaylist(event) {
        event.preventDefault();

        if (playlist.tracks != undefined) {
            const tracks = Object.values(playlist.tracks);
            updatePlayerTracks(tracks, tracks[0]);
        }
    }

    element.classList.add('cards__card');
    element.innerHTML = `
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
    `;

    element.querySelector(`#playlist-button-play-${playlist.id}`).addEventListener('click', playPlaylist);

    return element;
}

export { playlistComponent }
