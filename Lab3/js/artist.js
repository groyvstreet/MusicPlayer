let artistAlbums = [];

function playAlbum(id) {
    let album = artistAlbums.filter(album => album.id == id)[0];
    trackIndex = 0;
    currentTracks = album.tracks;
    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

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
                            <button class="icon-button icon-button_size_small" onclick="playAlbum('${album.id}'); return false">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');
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

document.getElementById('search').addEventListener('change', (event) => {
    let searchedAlbums = artistAlbums.filter(album => album.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getAlbums(searchedAlbums);
});
