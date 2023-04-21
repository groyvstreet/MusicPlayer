//import { updatePlayerTracks } from "./player.js";
import { getArtists } from "./api/artists.js";
//import { getAlbumsByArtist } from "./api/albums.js";
import { artistComponent } from "./components/artistComponent.js";
import { loadingComponent } from "./components/loadingComponent.js";
import { virtualizationComponent } from "./components/virtualizationComponent.js";

// async function playArtist(id) {
//     let artistAlbums = await getAlbumsByArtist(id);
//     artistAlbums = Object.values(artistAlbums);

//     if (artistAlbums.length == 0) {
//         return;
//     }

//     let artistTracks = [];

//     artistAlbums.map((album) => {
//         artistTracks = artistTracks.concat(album.tracks);
//     });

//     if (artistTracks.length != 0) {
//         updatePlayerTracks(artistTracks, artistTracks[0]);
//     }
// }

function renderArtists(artists) {
    // document.getElementById('cards').innerHTML = artists.map(function (artist) {
    //     return `
    //         <li class="cards__card">
    //             <a class="cards__a" href="artist.html#${artist.id}">
    //                 <section class="card">
    //                     <img class="cover-image" src="${artist.image}">
    //                     <div class="card__description">
    //                         <p class="title">${artist.nickname}</p>
    //                         <p class="info-p">Треки: ${artist.tracksAmount}</p>
    //                     </div>
    //                     <div class="card__buttons">
    //                         <button class="icon-button icon-button_size_small" id="artist-button-play-${artist.id}">
    //                             <img class="icon-button__image" src="img/forward.svg">
    //                         </button>
    //                     </div>
    //                 </section>
    //             </a>
    //         </li>
    //     `;
    // }).join('');

    // artists.forEach((artist) => {
    //     document.getElementById(`artist-button-play-${artist.id}`).addEventListener('click', (event) => {
    //         event.preventDefault();
            
    //         playArtist(artist.id);
    //     });
    // });

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

//loadArtists();
loadingComponent(loadArtists);
