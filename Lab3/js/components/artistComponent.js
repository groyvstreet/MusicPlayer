import { getAlbumsByArtist } from "../api/albums.js"
import { updatePlayerTracks } from "../player.js"

function artistComponent(artist) {
    const element = document.createElement('li');

    async function playArtist(event) {
        event.preventDefault();

        let artistAlbums = await getAlbumsByArtist(artist.id);
        artistAlbums = Object.values(artistAlbums);
    
        if (artistAlbums.length == 0) {
            return;
        }
    
        let artistTracks = [];
    
        artistAlbums.map((album) => {
            artistTracks = artistTracks.concat(album.tracks);
        });
    
        if (artistTracks.length != 0) {
            updatePlayerTracks(artistTracks, artistTracks[0]);
        }
    }

    element.classList.add('cards__card');
    element.innerHTML = `
        <a class="cards__a" href="artist.html#${artist.id}">
            <section class="card">
                <img class="cover-image" src="${artist.image}">
                <div class="card__description">
                    <p class="title">${artist.nickname}</p>
                    <p class="info-p">Треки: ${artist.tracksAmount}</p>
                </div>
                <div class="card__buttons">
                    <button class="icon-button icon-button_size_small" id="artist-button-play-${artist.id}">
                        <img class="icon-button__image" src="img/forward.svg">
                    </button>
                </div>
            </section>
        </a>
    `;

    element.querySelector(`#artist-button-play-${artist.id}`).addEventListener('click', playArtist);

    return element;
}

export { artistComponent }
