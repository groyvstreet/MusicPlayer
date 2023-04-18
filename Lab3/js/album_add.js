import { artistsToAddToAlbum, artistsToAddToAlbumAddEventListeners } from "./components/artistsToAddToAlbum.js";

function updateAlbumImage() {
    const files = document.getElementById('album-input-image').files;

    if (FileReader && files && files.length) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            document.getElementById('preview-image').src = fileReader.result;
        };
        fileReader.readAsDataURL(files[0]);
    }
}

let tracks = [];

function addTrack(event) {
    event.preventDefault();

    const track = {
        id: crypto.randomUUID(),
        title: 'Название',
        artists: []
    };
    tracks.push(track);

    const trackElement = document.createElement('li');
    trackElement.classList.add('cards__card');
    trackElement.id = track.id;
    trackElement.innerHTML = `
        <section class="card">
            <label class="cover-image">
                <img class="cover-image" src="img/upload.svg" id="album-track-image-${track.id}">
                <input type="file" accept="audio/mp3" id="album-input-track-${track.id}" hidden>
            </label>
            <div class="card__description">
                <p class="title" id="album-track-title-${track.id}">Название</p>
                <a class="info-button" href="">
                    <p class="info"></p>
                </a>
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

    document.getElementById('cards').appendChild(trackElement);

    function updateAlbumTrackImage(event) {
        event.preventDefault();

        document.getElementById(`album-track-image-${track.id}`).src = 'img/file.svg';
    }

    document.getElementById(`album-input-track-${track.id}`).addEventListener('change', updateAlbumTrackImage)

    function albumTrackTitleOnClick(event) {
        event.preventDefault();

        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal-content').innerHTML = `
            <input class="input" placeholder="Название" value="${track.title}" id="album-track-title-input-${track.id}">
        `;

        function albumTrackTitleInput(event) {
            track.title = event.target.value;
            document.getElementById(`album-track-title-${track.id}`).innerHTML = track.title;
        }

        document.getElementById(`album-track-title-input-${track.id}`).addEventListener('input', albumTrackTitleInput);
    }

    document.getElementById(`album-track-title-${track.id}`).addEventListener('click', albumTrackTitleOnClick);
    
    async function albumTrackAddArtistOnClick(event) {
        event.preventDefault();

        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal-content').innerHTML = await artistsToAddToAlbum(track, true);
        artistsToAddToAlbumAddEventListeners(track, true);
    }

    document.getElementById(`album-track-add-artist-${track.id}`).addEventListener('click', albumTrackAddArtistOnClick);
    
    async function albumTrackDeleteArtistOnClick(event) {
        event.preventDefault();

        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal-content').innerHTML = await artistsToAddToAlbum(track, false);
        artistsToAddToAlbumAddEventListeners(track, false);
    }
    
    document.getElementById(`album-track-delete-artist-${track.id}`).addEventListener('click', albumTrackDeleteArtistOnClick);

    function deleteAlbumTrack(event) {
        event.preventDefault();

        tracks = tracks.filter((t) => t.id != track.id);
        document.getElementById(track.id).remove();
    }

    document.getElementById(`album-track-delete-${track.id}`).addEventListener('click', deleteAlbumTrack);
}

document.getElementById('album-button-add-track').addEventListener('click', addTrack);
document.getElementById('album-input-image').addEventListener('change', updateAlbumImage);
document.getElementById('album-input-type').addEventListener('change', (event) => {
    console.log(event.target.value);
});

const modal = document.getElementById('modal');

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';

        tracks.forEach((track) => {
            if (track.title.trim().length == 0) {
                track.title = 'Название';
                document.getElementById(`album-track-title-${track.id}`).innerHTML = track.title;
            }
        });
    }
}
