import { updatePlayerTracks } from "./player.js";

let artistAlbums = [];

// function playAlbum(id) {
//     let album = artistAlbums.filter(album => album.id == id)[0];
//     trackIndex = 0;
//     currentTracks = album.tracks;
//     audio.src = currentTracks[trackIndex].src;
//     isTrackPlaying = false;
//     updatePlayerImagePlay();
//     isTrackPlaying = true;
//     audio.play();
// }

function getAlbums(albums) {
    document.getElementById('cards').innerHTML = albums.map(function (album) {
        return `
            <li class="cards__card">
                <a class="cards__a" href="album.html#${album.id}">
                    <section class="card">
                        <img class="cover-image" src="${album.image}">
                        <div class="card__description">
                            <p class="title">${album.title}</p>
                            <p class="info">${album.type}</p>
                        </div>
                        <div class="card__buttons">
                            <button class="icon-button icon-button_size_small" id="album-button-play-${album.id}">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');

    albums.forEach((album) => {
        document.getElementById(`album-button-play-${album.id}`).addEventListener('click', (event) => {
            event.preventDefault();

            if (album.tracks != undefined && album.tracks.length != 0) {
                updatePlayerTracks(album.tracks, album.tracks[0]);
            }
        });
    });
}

let id = window.location.href.split('#')[1];

function loadArtist() {
    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists/${id}.json`)
        .then((response) => response.json())
        .then((artist) => {
            document.getElementById('preview-image').src = artist.image;
            document.getElementById('preview-h1').innerHTML = artist.nickname;
            document.getElementById('preview-h2').innerHTML = `Треки: ${artist.tracksAmount}`;

            fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json?orderBy="artist/id"&equalTo="${artist.id}"`)
                .then((response) => response.json())
                .then((albums) => {
                    artistAlbums = Object.values(albums);
                    getAlbums(artistAlbums);
                })
        });
}

loadArtist();

document.getElementById('search').addEventListener('input', (event) => {
    const input = event.target.value.toLowerCase().trim();
    let searchedAlbums = artistAlbums.filter(album => album.title.toLowerCase().includes(input));
    getAlbums(searchedAlbums);
});
