import { addTrackToPlaylist, updatePlaylistTracksAmount } from "../api/playlists.js";
import { loadingComponent } from "./loadingComponent.js";

function playlistToAddTrack(playlist, track, userId) {
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
                    <button class="icon-button icon-button_size_small" id="playlist-button-add-${playlist.id}">
                        <img class="icon-button__image" src="img/simple-plus.svg">
                    </button>
                </div>
            </section>
        </a>
    `;

    async function addTrack() {
        if (playlist.tracks == undefined) {
            playlist.tracks = {};
        }

        playlist.tracks[track.id] = track;
        await addTrackToPlaylist(userId, playlist.id, track);
        await updatePlaylistTracksAmount(userId, playlist.id, Object.values(playlist.tracks).length);

        element.remove();

        document.getElementById('modal').style.display = 'none';
    }

    function playlistAddButtonOnClick(event) {
        event.preventDefault();

        loadingComponent(addTrack);
    }
    
    element.querySelector(`#playlist-button-add-${playlist.id}`).addEventListener('click', playlistAddButtonOnClick);

    return element;
}

export { playlistToAddTrack }
