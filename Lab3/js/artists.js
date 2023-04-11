let artists = [];

let artistTracks = [];

async function playArtist(id) {
    let response = await fetch("https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json");
    let albums = await response.json();
    let artistAlbums = albums.filter((album) => album.artist.id == id);

    if (artistAlbums == 0) {
        return;
    }

    artistAlbums.map((album) => {
        artistTracks = artistTracks.concat(album.tracks);
    });
    currentTracks = artistTracks;
    trackIndex = 0;
    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function getArtists(artists) {
    document.getElementById("cards").innerHTML = artists.map(function (artist) {
        return `
            <li class="cards__card">
                <a class="cards__a" href="artist.html#${artist.id}">
                    <section class="card">
                        <img class="cover-image" src="${artist.image}">
                        <div class="card__description">
                            <p class="title">${artist.nickname}</p>
                            <p class="info">Треки: ${artist.tracks_amount}</p>
                        </div>
                        <div class="card__buttons">
                            <button class="icon-button icon-button_size_small" onclick="playArtist(${artist.id}); return false">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');
}

function loadArtists() {
    fetch("https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists.json")
        .then((response) => response.json())
        .then((a) => {
            artists = a;
            getArtists(artists);
        });
}

loadArtists();

document.getElementById("search").addEventListener("change", (event) => {
    let searchedArtists = artists.filter(artist => artist.nickname.toLowerCase().includes(event.target.value.toLowerCase()));
    getArtists(searchedArtists);
});
