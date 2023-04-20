import { getArtists } from "../api/artists.js";
import { artistToAddToAlbum } from "./artistToAddToAlbum.js";

async function artistsToAddToAlbum(track, toAdd) {
    let artists = [];
    
    if (toAdd) {
        artists = await getArtists();
        artists = Object.values(artists);
        artists = artists.filter((artist) => track.artists.filter((trackArtist) => trackArtist.id == artist.id).length == 0);
    } else {
        artists = track.artists;
    }

    const element = document.createElement('div');
    element.classList.add('content');
    element.innerHTML = `
        <input class="input" type="search" placeholder="Поиск..." id="search">
        <ul class="cards" id="cards"></ul>
    `;

    artists.forEach((artist) => {
        element.getElementsByClassName('cards')[0].appendChild(artistToAddToAlbum(artist, toAdd, track));
    });

    function searchArtists(event) {
        const input = event.target.value.toLowerCase().trim();
        const searchedArtists = artists.filter((artist) => artist.nickname.toLowerCase().includes(input));
        
        const artistsElement = element.getElementsByClassName('cards')[0];
        artistsElement.replaceChildren();

        searchedArtists.forEach((artist) => {
            artistsElement.appendChild(artistToAddToAlbum(artist, toAdd, track));
        });
    }

    element.getElementsByClassName('input')[0].addEventListener('input', searchArtists);
    return element;
}

export { artistsToAddToAlbum }