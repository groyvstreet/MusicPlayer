import { getArtists } from "../api/artists.js";

async function artistsToAddToAlbum(track, toAdd) {
    let artists;
    
    if (toAdd) {
        artists = await getArtists();
        artists = Object.values(artists);
        artists = artists.filter((artist) => track.artists.filter((trackArtist) => trackArtist.id == artist.id).length == 0);
    } else {
        artists = track.artists;
    }

    return `
        <input class="input" type="search" placeholder="Поиск..." id="search">
        <ul class="cards" id="cards">
            ${artists.map((artist) => {
                return `
                    <li class="cards__card" id="album-track-artist-${artist.id}">
                        <a class="cards__a">
                            <section class="card">
                                <img class="cover-image" src="${artist.image}">
                                <div class="card__description">
                                    <p class="title">${artist.nickname}</p>
                                    <p class="info-p">Треки: ${artist.tracksAmount}</p>
                                </div>
                                <div class="card__buttons">
                                    <button class="icon-button icon-button_size_small" id="album-track-artist-add-${artist.id}">
                                        <img class="icon-button__image" src="${toAdd ? 'img/simple-plus.svg' : 'img/cancel.svg'}">
                                    </button>
                                </div>
                            </section>
                        </a>
                    </li>
                `;
            }).join('')}
        </ul>
    `;
}

async function artistsToAddToAlbumAddEventListeners(track, toAdd) {
    let artists;
    
    if (toAdd) {
        artists = await getArtists();
        artists = Object.values(artists);
        artists = artists.filter((artist) => track.artists.filter((trackArtist) => trackArtist.id == artist.id).length == 0);
    } else {
        artists = track.artists;
    }

    artists.forEach((artist) => {
        async function addToTrack() {
            if (toAdd) {
                track.artists.push(artist);
            } else {
                track.artists = track.artists.filter((trackArtist) => trackArtist.id != artist.id);
            }

            document.getElementById(`album-track-artist-${artist.id}`).remove()
        }

        document.getElementById(`album-track-artist-add-${artist.id}`).addEventListener('click', addToTrack);
    });
}

export { artistsToAddToAlbum, artistsToAddToAlbumAddEventListeners }
