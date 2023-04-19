import { isAuthenticated } from "./app.js";
import { updatePlayerTracks, getCurrentTrack, updateFavoriteButtonImage } from "./player.js";
import { addTrackToFavorite, removeTrackFromFavorite } from "./api/tracks.js"
import { getAlbums } from "./api/albums.js";
import { updateUserFavoriteTracksAmount } from "./api/users.js";

function renderTracks(user, tracks) {
    function getLikeImage(trackId) {
        if (user.favoriteTracks.filter(track => track.id == trackId).length == 0) {
            return 'img/heart.svg';
        } else {
            return 'img/fill-heart-active.svg';
        }
    }

    async function setAlbumUrl(trackId) {
        let albums = await getAlbums();
        albums = Object.values(albums);
        const album = albums.filter((album) => album.tracks.filter((t) => t.id == trackId).length != 0)[0];
        document.getElementById(`album-url-${trackId}`).href = `album.html#${album.id}`;
    }

    function likeButtonOnClick(track) {
        if (isAuthenticated()) {
            if (user.favoriteTracks.filter(t => t.id == track.id).length == 0) {
                addTrackToFavorite(user.id, track);
                user.favoriteTracks.push({ id: track.id});
            } else {
                removeTrackFromFavorite(user.id, track);
                user.favoriteTracks = user.favoriteTracks.filter((t) => t.id != track.id);
            }

            updateUserFavoriteTracksAmount(user);

            document.getElementById(`card-img-like-${track.id}`).src = getLikeImage(track.id);

            const currentPlayerTrack = getCurrentTrack();

            if (currentPlayerTrack != null && currentPlayerTrack.id == track.id) {
                updateFavoriteButtonImage(user.favoriteTracks.filter(t => t.id == currentPlayerTrack.id).length == 0);
            }
        } else {
            window.location.href = 'signin.html';
        }
    }

    document.getElementById('cards').innerHTML = tracks.map(function (track) {
        return `
            <li class="cards__card">
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
                    <div class="card__buttons">
                        <button class="icon-button icon-button_size_small" id="card-button-like-${track.id}">
                            <img class="icon-button__image" src="${getLikeImage(track.id)}" id="card-img-like-${track.id}">
                        </button>
                        <button class="icon-button icon-button_size_small" id="card-button-play-${track.id}">
                            <img class="icon-button__image" src="img/forward.svg">
                        </button>
                    </div>
                </section>
            </li>
        `;
    }).join('');

    tracks.forEach((track) => {
        if (document.getElementById(`anim-${track.id}`).scrollWidth > document.getElementById(`anim-${track.id}`).offsetWidth) {
            let keyframes = [
                { transform: 'translateX(0)' },
                { transform: `translateX(${0 - document.getElementById(`anim-${track.id}`).scrollWidth + document.getElementById(`anim-${track.id}`).offsetWidth}px)` },
                { transform: 'translateX(0)' }
            ];
            
            document.getElementById(`anim-${track.id}`).animate(keyframes, {
                duration: track.artists.length * 2000,
                iterations: Infinity,
                timingFunction: 'linear'
            });
        }

        setAlbumUrl(track.id);

        document.getElementById(`card-button-like-${track.id}`).addEventListener('click', () => {
            likeButtonOnClick(track);
        });

        document.getElementById(`card-button-play-${track.id}`).addEventListener('click', () => {
            updatePlayerTracks(tracks, track);
        });

        document.getElementById('player-img-favorite').addEventListener('load', () => {
            document.getElementById(`card-img-like-${track.id}`).src = getLikeImage(track.id);
        });
    });
}

export { renderTracks }
