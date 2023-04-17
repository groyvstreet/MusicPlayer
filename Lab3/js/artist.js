import { updatePlayerTracks } from "./player.js";
import { getArtist } from "./api/artists.js";
import { getAlbumsByArtist } from "./api/albums.js";

function renderAlbums(albums) {
    document.getElementById('cards').innerHTML = albums.map(function (album) {
        return `
            <li class="cards__card">
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
            </li>
        `;
    }).join('');

    albums.forEach((album) => {
        function playAlbum(event) {
            event.preventDefault();

            if (album.tracks != undefined && album.tracks.length != 0) {
                updatePlayerTracks(album.tracks, album.tracks[0]);
            }
        }

        document.getElementById(`album-button-play-${album.id}`).addEventListener('click', playAlbum);
    });
}

async function loadArtist(id) {
    const artist = await getArtist(id);
    document.getElementById('preview-image').src = artist.image;
    document.getElementById('preview-h1').innerHTML = artist.nickname;
    document.getElementById('preview-h2').innerHTML = `Треки: ${artist.tracksAmount}`;

    let artistAlbums = await getAlbumsByArtist(artist.id);
    artistAlbums = Object.values(artistAlbums);
    renderAlbums(artistAlbums);

    function searchAlbums(event) {
        const input = event.target.value.toLowerCase().trim();
        let searchedAlbums = artistAlbums.filter(album => album.title.toLowerCase().includes(input));
        renderAlbums(searchedAlbums);
    }

    document.getElementById('search').addEventListener('input', searchAlbums);
}

const id = window.location.href.split('#')[1];
loadArtist(id);
