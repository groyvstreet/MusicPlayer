import { artistsToAddToAlbum } from "./artistsToAddToAlbum.js";
import { loadingComponent } from "./loadingComponent.js";

function trackForAlbum(track, album, isdeleteButtonHidden) {
    function updateAlbumTrackImage(event) {
        event.preventDefault();

        document.getElementById(`album-track-${track.id}`).style.border = 'none';

        const imgs = element.getElementsByTagName('img');
        
        for (let i = 0; i < imgs.length; i++) {
            if (imgs[i].id == `album-track-image-${track.id}`) {
                imgs[i].src = 'img/file.svg';
            }
        }
    }

    function albumTrackTitleOnClick(event) {
        event.preventDefault();

        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal').innerHTML = `
            <input class="input" placeholder="Название" value="${track.title}" id="album-track-title-input-${track.id}">
        `;

        function albumTrackTitleInput(event) {
            track.title = event.target.value;
            element.getElementsByClassName('title')[0].innerHTML = track.title;
        }

        document.getElementById(`album-track-title-input-${track.id}`).addEventListener('input', albumTrackTitleInput);
    }

    async function addArtistToAlbumTrack() {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal').innerHTML = `
            <div class="modal__content content" id="modal-content"></div>
        `;
        document.getElementById('modal-content').replaceChildren((await artistsToAddToAlbum(track, true)));
    }

    async function albumTrackAddArtistOnClick(event) {
        event.preventDefault();

        loadingComponent(addArtistToAlbumTrack);
    }

    async function albumTrackDeleteArtistOnClick(event) {
        event.preventDefault();

        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal').innerHTML = `
            <div class="modal__content content" id="modal-content"></div>
        `;
        document.getElementById('modal-content').replaceChildren((await artistsToAddToAlbum(track, false)));
    }

    function deleteAlbumTrack(event) {
        event.preventDefault();

        album.tracks = album.tracks.filter((t) => t.id != track.id);
        element.remove();
    }

    const element = document.createElement('li');
    element.classList.add('cards__card');
    element.innerHTML = `
        <section class="card" id="album-track-${track.id}">
            <label class="cover-image">
                <img class="cover-image" src="img/upload.svg" id="album-track-image-${track.id}">
                <input type="file" accept="audio/mp3" id="album-input-track-${track.id}" hidden>
            </label>
            <div class="card__description">
                <p class="title" id="album-track-title-${track.id}">Название</p>
                <div class="info">
                    <div class="info__list" id="album-track-artists-${track.id}"></div>
                </div>
            </div>
            <div class="card__buttons">
                <button class="icon-button icon-button_size_small" id="album-track-add-artist-${track.id}">
                    <img class="icon-button__image" src="img/add-artist.svg">
                </button>
                <button class="icon-button icon-button_size_small" id="album-track-delete-artist-${track.id}">
                    <img class="icon-button__image" src="img/delete-artist.svg">
                </button>
                <button class="icon-button icon-button_size_small" id="album-track-delete-${track.id}">
                    <img class="icon-button__image" src="img/delete.svg">
                </button>
            </div>
        </section>
    `;

    element.getElementsByTagName('input')[0].addEventListener('change', updateAlbumTrackImage);
    element.getElementsByClassName('title')[0].addEventListener('click', albumTrackTitleOnClick);
    
    const buttons = element.getElementsByClassName('icon-button');

    buttons[0].addEventListener('click', albumTrackAddArtistOnClick);
    buttons[1].addEventListener('click', albumTrackDeleteArtistOnClick);

    if (isdeleteButtonHidden) {
        buttons[2].hidden = true;
    } else {
        buttons[2].addEventListener('click', deleteAlbumTrack);
    }

    return element;
}

export { trackForAlbum }
