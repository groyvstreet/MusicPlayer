import { getArtists } from "./api/artists.js";
import { artistComponent } from "./components/artistComponent.js";
import { loadingComponent } from "./components/loadingComponent.js";
import { virtualizationComponent } from "./components/virtualizationComponent.js";

function renderArtists(artists) {
    document.getElementById('cards').replaceChildren();
    virtualizationComponent(document.getElementById('cards'), artists, artistComponent, []);
}

async function loadArtists() {
    let artists = await getArtists();
    artists = Object.values(artists);
    renderArtists(artists);

    document.getElementById('search').addEventListener('input', (event) => {
        const input = event.target.value.toLowerCase().trim();
        let searchedArtists = artists.filter(artist => artist.nickname.toLowerCase().includes(input));
        renderArtists(searchedArtists);
    });
}

loadingComponent(loadArtists);
