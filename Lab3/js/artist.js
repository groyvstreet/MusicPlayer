import { getArtist } from "./api/artists.js";
import { getAlbumsByArtist } from "./api/albums.js";
import { albumComponent } from "./components/albumComponent.js";
import { virtualizationComponent } from "./components/virtualizationComponent.js";
import { loadingComponent } from "./components/loadingComponent.js";

function renderAlbums(albums) {
    document.getElementById('cards').replaceChildren();
    virtualizationComponent(document.getElementById('cards'), albums, albumComponent, []);
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
loadingComponent(loadArtist, [id]);
