import { updatePlayerTracks } from "../player.js";

function albumComponent(album) {
    const element = document.createElement('li');

    function playAlbum(event) {
        event.preventDefault();

        if (album.tracks != undefined && album.tracks.length != 0) {
            updatePlayerTracks(album.tracks, album.tracks[0]);
        }
    }

    element.classList.add('cards__card');
    element.innerHTML = `
        <a class="cards__a" href="album.html#${album.id}">
            <section class="card">
                <img class="cover-image" src="${album.image}">
                <div class="card__description">
                    <p class="title">${album.title}</p>
                    <p class="info-p">${album.type}</p>
                </div>
                <div class="card__buttons">
                    <button class="icon-button icon-button_size_small" id="album-button-play-${album.id}">
                        <img class="icon-button__image" src="img/forward.svg">
                    </button>
                </div>
            </section>
        </a>
    `;

    element.querySelector(`#album-button-play-${album.id}`).addEventListener('click', playAlbum);

    return element;
}

export { albumComponent }
