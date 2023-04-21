import { user, isAuthenticated } from "./app.js";
import { trackForAlbum } from "./components/trackForAlbum.js";
import { addAlbum } from "./api/albums.js";
import { addAlbumImage, addTrackFile } from "./api/files.js";
import { getArtist, updateArtist } from "./api/artists.js";
import { loadingComponent } from "./components/loadingComponent.js";

if (!isAuthenticated()) {
    window.location.href = 'signin.html';
}

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

const album = {
    id: crypto.randomUUID(),
    title: '',
    type: 'Альбом',
    tracks: []
};

const borderColor = document.getElementById('album-input-title').style.borderColor;

function addTrack(event) {
    if (event != null) {
        event.preventDefault();
    }

    const track = {
        id: crypto.randomUUID(),
        title: 'Название',
        artists: []
    };
    album.tracks.push(track);

    document.getElementById('cards').appendChild(trackForAlbum(track, album.tracks, album.type == 'Сингл'));
}

function albumTitleInput(event) {
    album.title = event.target.value;
    document.getElementById('album-input-title').style.borderColor = borderColor;
}

function clearAlbumTracks() {
    album.tracks = [];
    const cards = document.getElementById('cards').querySelectorAll('*');

    for (let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }
}

function albumTypeChange(event) {
    clearAlbumTracks();

    const type = event.target.value;

    if (type == '1') {
        album.type = 'Альбом';
        document.getElementById('album-button-add-track').hidden = false;
    }
    if (type == '2') {
        album.type = 'Мини-альбом';
        document.getElementById('album-button-add-track').hidden = false;
    }
    if (type == '3') {
        album.type = 'Сингл';
        document.getElementById('album-button-add-track').hidden = true;
        addTrack(null);
    }
}

async function uploadAlbum() {
    album.artist = await getArtist((await user).artistId);
    album.tracksAmount = album.tracks.length;
    album.artist.tracksAmount += album.tracksAmount;

    await updateArtist(album.artist);

    const albumImage = document.getElementById('album-input-image').files[0];
    await addAlbumImage(album.id, albumImage);
    album.image = `https://firebasestorage.googleapis.com/v0/b/krakensound-ee3a2.appspot.com/o/img%2Falbums%2F${album.id}?alt=media`;

    for (let i = 0; i < album.tracks.length; i++) {
        album.tracks[i].image = album.image;
        album.tracks[i].src = `https://firebasestorage.googleapis.com/v0/b/krakensound-ee3a2.appspot.com/o/tracks%2F${album.tracks[i].id}?alt=media`;
        const trackFile = document.getElementById(`album-input-track-${album.tracks[i].id}`).files[0];
        await addTrackFile(album.tracks[i].id, trackFile);
    }

    const response = await addAlbum(album);

    if (response.ok) {
        window.location.href = `album.html#${album.id}`;
    }
}

async function albumUploadButtonOnClick(event) {
    event.preventDefault();

    if (album.title.trim().length == 0) {
        document.getElementById('album-input-title').style.borderColor = 'red';
        return;
    }

    if (document.getElementById('album-input-image').files.length == 0) {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal-content').innerHTML = 'Обложка альбома не выбрана.';
        return;
    }

    if (album.tracks.length == 0) {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal-content').innerHTML = 'Не добавлено ни одного трека.';
        return;
    }

    let isValid = true;
    album.tracks.forEach((track) => {
        if (document.getElementById(`album-input-track-${track.id}`).files.length == 0 ||
            track.artists.length == 0) {
            document.getElementById(`album-track-${track.id}`).style.border = '2px solid red';
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    await loadingComponent(uploadAlbum);    
}

document.getElementById('album-input-image').addEventListener('change', updateAlbumImage);
document.getElementById('album-input-title').addEventListener('input', albumTitleInput);
document.getElementById('album-input-type').addEventListener('change', albumTypeChange);
document.getElementById('album-button-upload').addEventListener('click', albumUploadButtonOnClick);
document.getElementById('album-button-add-track').addEventListener('click', addTrack);

const modal = document.getElementById('modal');

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';

        album.tracks.forEach((track) => {
            if (track.title.trim().length == 0) {
                track.title = 'Название';
                document.getElementById(`album-track-title-${track.id}`).innerHTML = track.title;
            }
        });
    }
}
