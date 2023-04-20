import { addTrackToPlaylist, updatePlaylistTracksAmount } from "../api/playlists.js";

function dropZonePlaylist(playlist) {
    const element = document.createElement('li');
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
    element.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
    element.addEventListener('drop', async (event) => {
        const userId = event.dataTransfer.getData('user_id');
        const track = JSON.parse(event.dataTransfer.getData('track'));

        if (playlist.tracks == undefined) {
            playlist.tracks = {};
        }

        playlist.tracks[track.id] = track;
        await addTrackToPlaylist(userId, playlist.id, track);
        await updatePlaylistTracksAmount(userId, playlist.id, Object.values(playlist.tracks).length);
    });

    return element;
}

export { dropZonePlaylist }
