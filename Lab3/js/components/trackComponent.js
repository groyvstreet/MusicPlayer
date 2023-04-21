import { getAlbums } from "../api/albums.js";
import { isAuthenticated } from "../app.js";
import { addTrackToFavorite, removeTrackFromFavorite } from "../api/tracks.js";
import { updateUserFavoriteTracksAmount } from "../api/users.js";
import { getCurrentTrack, updatePlayerTracks, updateFavoriteButtonImage } from "../player.js";
import { playlistToAddTrack } from "./playlistToAddTrack.js";
import { deleteTrackFromPlaylist, updatePlaylistTracksAmount } from "../api/playlists.js";
import { virtualizationComponent } from "./virtualizationComponent.js";

function trackComponent(track, user, tracks) {
    const element = document.createElement('li');

    function getLikeImage() {
        if (user.favoriteTracks.filter(t => t.id == track.id).length == 0) {
            return 'img/heart.svg';
        } else {
            return 'img/fill-heart-active.svg';
        }
    }

    async function setAlbumUrl() {
        let albums = await getAlbums();
        albums = Object.values(albums);
        const album = albums.filter((album) => album.tracks.filter((t) => t.id == track.id).length != 0)[0];
        element.querySelector(`#album-url-${track.id}`).href = `album.html#${album.id}`;
    }

    function likeButtonOnClick(event) {
        event.stopPropagation();
        if (isAuthenticated()) {
            if (user.favoriteTracks.filter(t => t.id == track.id).length == 0) {
                addTrackToFavorite(user.id, track);
                user.favoriteTracks.push({ id: track.id});
            } else {
                removeTrackFromFavorite(user.id, track);
                user.favoriteTracks = user.favoriteTracks.filter((t) => t.id != track.id);
            }

            updateUserFavoriteTracksAmount(user);

            element.querySelector(`#card-img-like-${track.id}`).src = getLikeImage();

            const currentPlayerTrack = getCurrentTrack();

            if (currentPlayerTrack != null && currentPlayerTrack.id == track.id) {
                updateFavoriteButtonImage(user.favoriteTracks.filter(t => t.id == currentPlayerTrack.id).length == 0);
            }
        } else {
            window.location.href = 'signin.html';
        }
    }

    function animateTrackArtists() {
        if (element.querySelector(`#anim-${track.id}`).scrollWidth > element.querySelector(`#anim-${track.id}`).offsetWidth) {
            let keyframes = [
                { transform: 'translateX(0)' },
                { transform: `translateX(${0 - element.querySelector(`#anim-${track.id}`).scrollWidth + element.querySelector(`#anim-${track.id}`).offsetWidth}px)` },
                { transform: 'translateX(0)' }
            ];
            
            element.querySelector(`#anim-${track.id}`).animate(keyframes, {
                duration: track.artists.length * 2000,
                iterations: Infinity,
                timingFunction: 'linear'
            });
        }
    }

    function onTrackElementClick() {
        if (isAuthenticated()) {
            document.getElementById('modal').style.display = 'flex';

            if (Object.values(user.playlists).length == 0) {
                document.getElementById('modal-content').innerHTML = `
                    <p>У вас ещё нет плейлистов.</p>
                `;
                return;
            }

            document.getElementById('modal-content').innerHTML = `
                <ul class="cards" id="modal-cards"></ul>
            `;

            const playlists = Object.values(user.playlists).filter((playlist) => {
                if (playlist.tracks == undefined) {
                    return true;
                }

                return !(track.id in playlist.tracks);
            });
            
            if (playlists.length == 0) {
                document.getElementById('modal-content').innerHTML = `
                    <p>Этот трек уже находится в плейлистах, которые у вас есть.</p>
                `;
            } else {
                virtualizationComponent(document.getElementById('modal-cards'), playlists, playlistToAddTrack, [track, user.id]);

                // playlists.forEach((playlist) => {
                //     document.getElementById('modal-cards').appendChild(playlistToAddTrack(playlist, track, user.id));
                // });
            }
        }
    }

    function appendDeleteButton() {
        if (window.location.href.split('#')[0].split('/').pop() == 'playlist.html') {
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('icon-button');
            buttonElement.classList.add('icon-button_size_small');
            buttonElement.id = `card-button-delete-${track.id}`;
            buttonElement.innerHTML = `
                <img class="icon-button__image" src="img/delete.svg">
            `;
    
            buttonElement.addEventListener('click', async (event) => {
                event.stopPropagation();

                const playlistId = window.location.href.split('#')[1];

                await deleteTrackFromPlaylist(user.id, playlistId, track.id);

                delete user.playlists[playlistId].tracks[track.id]
                
                await updatePlaylistTracksAmount(user.id, playlistId, Object.values(user.playlists[playlistId].tracks).length);
    
                element.remove();
            });
            
            element.querySelector(`#track-buttons-${track.id}`).append(buttonElement);
        }
    }

    element.classList.add('cards__card');
    element.id = `track-item-${track.id}`;
    element.innerHTML = `
        <section class="card">
            <a class="cover-image" href="" id="album-url-${track.id}">
                <img class="cover-image" src="${track.image}">
            </a>
            <div class="card__description">
                <p class="title">${track.title}</p>
                <div class="info">
                    <div class="info__list" id="anim-${track.id}">
                        ${track.artists.map((artist) => {
                            return `
                                <a class="info__button" href="artist.html#${artist.id}">
                                    <p class="info-p">${artist.nickname}</p>
                                </a>
                            `;
                        }).join('&')}
                    </div>
                </div>
            </div>
            <div class="card__buttons" id='track-buttons-${track.id}'>
                <button class="icon-button icon-button_size_small" id="card-button-like-${track.id}">
                    <img class="icon-button__image" src="${getLikeImage()}" id="card-img-like-${track.id}">
                </button>
                <button class="icon-button icon-button_size_small" id="card-button-play-${track.id}">
                    <img class="icon-button__image" src="img/forward.svg">
                </button>
            </div>
        </section>
    `;

    setAlbumUrl();

    appendDeleteButton();
    
    element.querySelector(`#album-url-${track.id}`).addEventListener('click', (event) => {
        event.stopPropagation();
    });
    element.addEventListener('click', onTrackElementClick);
    element.querySelector(`#card-button-like-${track.id}`).addEventListener('click', likeButtonOnClick);
    element.querySelector(`#card-button-play-${track.id}`).addEventListener('click', (event) => {
        event.stopPropagation();
        updatePlayerTracks(tracks, track);
    });
    document.getElementById('player-img-favorite').addEventListener('load', () => {
        element.querySelector(`#card-img-like-${track.id}`).src = getLikeImage();
    });

    const observer = new MutationObserver(() => {
        if (document.contains(element)) {
            animateTrackArtists();
            observer.disconnect();
        }
    });

    observer.observe(document, {attributes: false, childList: true, characterData: false, subtree: true});
    
    return element;
}

export { trackComponent }
