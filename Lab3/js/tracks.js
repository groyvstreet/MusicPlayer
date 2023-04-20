import { isAuthenticated } from "./app.js";
import { updatePlayerTracks, getCurrentTrack, updateFavoriteButtonImage } from "./player.js";
import { addTrackToFavorite, removeTrackFromFavorite } from "./api/tracks.js"
import { getAlbums } from "./api/albums.js";
import { updateUserFavoriteTracksAmount } from "./api/users.js";
import { playlistToAddTrack } from "./components/playlistToAddTrack.js";
import { deleteTrackFromPlaylist, updatePlaylistTracksAmount } from "./api/playlists.js";
import { virtualizationComponent } from "./components/virtualizationComponent.js";
import { trackComponent } from "./components/trackComponent.js";

function renderTracks(user, tracks) {
    // function getLikeImage(trackId) {
    //     if (user.favoriteTracks.filter(track => track.id == trackId).length == 0) {
    //         return 'img/heart.svg';
    //     } else {
    //         return 'img/fill-heart-active.svg';
    //     }
    // }

    // async function setAlbumUrl(trackId) {
    //     let albums = await getAlbums();
    //     albums = Object.values(albums);
    //     const album = albums.filter((album) => album.tracks.filter((t) => t.id == trackId).length != 0)[0];
    //     document.getElementById(`album-url-${trackId}`).href = `album.html#${album.id}`;
    // }

    // function likeButtonOnClick(track) {
    //     if (isAuthenticated()) {
    //         if (user.favoriteTracks.filter(t => t.id == track.id).length == 0) {
    //             addTrackToFavorite(user.id, track);
    //             user.favoriteTracks.push({ id: track.id});
    //         } else {
    //             removeTrackFromFavorite(user.id, track);
    //             user.favoriteTracks = user.favoriteTracks.filter((t) => t.id != track.id);
    //         }

    //         updateUserFavoriteTracksAmount(user);

    //         document.getElementById(`card-img-like-${track.id}`).src = getLikeImage(track.id);

    //         const currentPlayerTrack = getCurrentTrack();

    //         if (currentPlayerTrack != null && currentPlayerTrack.id == track.id) {
    //             updateFavoriteButtonImage(user.favoriteTracks.filter(t => t.id == currentPlayerTrack.id).length == 0);
    //         }
    //     } else {
    //         window.location.href = 'signin.html';
    //     }
    // }

    // document.getElementById('cards').innerHTML = tracks.map((track) => {
    //     return `
    //         <li class="cards__card" id="track-item-${track.id}">
    //             <section class="card">
    //                 <a class="cover-image" href="" id="album-url-${track.id}">
    //                     <img class="cover-image" src="${track.image}">
    //                 </a>
    //                 <div class="card__description">
    //                     <p class="title">${track.title}</p>
    //                     <div class="info">
    //                         <div class="info__list" id="anim-${track.id}">
    //                             ${track.artists.map((artist) => {
    //                                 return `
    //                                     <a class="info__button" href="artist.html#${artist.id}">
    //                                         <p class="info-p">${artist.nickname}</p>
    //                                     </a>
    //                                 `;
    //                             }).join('&')}
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="card__buttons" id='track-buttons-${track.id}'>
    //                     <button class="icon-button icon-button_size_small" id="card-button-like-${track.id}">
    //                         <img class="icon-button__image" src="${getLikeImage(track.id)}" id="card-img-like-${track.id}">
    //                     </button>
    //                     <button class="icon-button icon-button_size_small" id="card-button-play-${track.id}">
    //                         <img class="icon-button__image" src="img/forward.svg">
    //                     </button>
    //                 </div>
    //             </section>
    //         </li>
    //     `;
    // }).join('');

    // tracks.forEach((track) => {
    //     if (document.getElementById(`anim-${track.id}`).scrollWidth > document.getElementById(`anim-${track.id}`).offsetWidth) {
    //         let keyframes = [
    //             { transform: 'translateX(0)' },
    //             { transform: `translateX(${0 - document.getElementById(`anim-${track.id}`).scrollWidth + document.getElementById(`anim-${track.id}`).offsetWidth}px)` },
    //             { transform: 'translateX(0)' }
    //         ];
            
    //         document.getElementById(`anim-${track.id}`).animate(keyframes, {
    //             duration: track.artists.length * 2000,
    //             iterations: Infinity,
    //             timingFunction: 'linear'
    //         });
    //     }

    //     setAlbumUrl(track.id);

    //     document.getElementById(`track-item-${track.id}`).addEventListener('click', () => {
    //         if (isAuthenticated()) {
    //             document.getElementById('modal').style.display = 'flex';

    //             if (Object.values(user.playlists).length == 0) {
    //                 document.getElementById('modal-content').innerHTML = `
    //                     <p>У вас ещё нет плейлистов.</p>
    //                 `;
    //                 return;
    //             }

    //             document.getElementById('modal-content').innerHTML = `
    //                 <ul class="cards" id="modal-cards"></ul>
    //             `;

    //             const playlists = Object.values(user.playlists).filter((playlist) => {
    //                 if (playlist.tracks == undefined) {
    //                     return true;
    //                 }

    //                 return !(track.id in playlist.tracks);
    //             });
                
    //             if (playlists.length == 0) {
    //                 document.getElementById('modal-content').innerHTML = `
    //                     <p>Этот трек уже находится в плейлистах, которые у вас есть.</p>
    //                 `;
    //             } else {
    //                 playlists.forEach((playlist) => {
    //                     document.getElementById('modal-cards').appendChild(playlistToAddTrack(playlist, track, user.id));
    //                 });
    //             }
    //         }
    //     });

    //     if (window.location.href.split('#')[0].split('/').pop() == 'playlist.html') {
    //         const buttonElement = document.createElement('button');
    //         buttonElement.classList.add('icon-button');
    //         buttonElement.classList.add('icon-button_size_small');
    //         buttonElement.id = `card-button-delete-${track.id}`;
    //         buttonElement.innerHTML = `
    //             <img class="icon-button__image" src="img/delete.svg">
    //         `;

    //         buttonElement.addEventListener('click', async (event) => {
    //             event.stopPropagation();

    //             await deleteTrackFromPlaylist(user.id, window.location.href.split('#')[1], track.id);
    //             const index = tracks.indexOf(track);
    //             tracks.splice(index, 1);
    //             await updatePlaylistTracksAmount(user.id, window.location.href.split('#')[1], tracks.length);

    //             document.getElementById(`track-item-${track.id}`).remove();
    //         });
            
    //         document.getElementById(`track-buttons-${track.id}`).append(buttonElement);
    //     }

    //     document.getElementById(`album-url-${track.id}`).addEventListener('click', (event) => {
    //         event.stopPropagation();
    //     });

    //     document.getElementById(`card-button-like-${track.id}`).addEventListener('click', (event) => {
    //         event.stopPropagation();
    //         likeButtonOnClick(track);
    //     });

    //     document.getElementById(`card-button-play-${track.id}`).addEventListener('click', (event) => {
    //         event.stopPropagation();
    //         updatePlayerTracks(tracks, track);
    //     });

    //     document.getElementById('player-img-favorite').addEventListener('load', () => {
    //         document.getElementById(`card-img-like-${track.id}`).src = getLikeImage(track.id);
    //     });
    // });

    document.getElementById('cards').replaceChildren();
    virtualizationComponent(document.getElementById('cards'), tracks, trackComponent, [user, tracks]);
    //document.getElementById('cards').appendChild(virtualizationComponent(tracks, trackComponent, []));
}

const modal = document.getElementById('modal');

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

export { renderTracks }
