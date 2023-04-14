import { isAuthenticated } from "./app.js";
import { updatePlayerTracks } from "./player.js";

function getImage(user, id) {
    if (user.favoriteTracks.filter(track => track.id == id).length == 0) {
        return 'img/heart.svg';
    } else {
        return 'img/fill-heart-active.svg';
    }
}

function getTracks(user, tracks) {
    const cards = document.getElementById('cards');
    cards.innerHTML = tracks.map(function (track) {
        return `
            <li class="cards__card">
                <section class="card">
                    <a class="cover-image" href="album.html">
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
                            <img class="icon-button__image" src="${getImage(user, track.id)}" id="card-img-like-${track.id}">
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
        document.getElementById(`card-button-like-${track.id}`).addEventListener('click', () => {
            if (isAuthenticated()) {
                let img = document.getElementById(`card-img-like-${track.id}`);

                if (user.favoriteTracks.filter(t => t.id == track.id).length == 0) {
                    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/favoriteTracks/${track.id}.json`, {
                        method: 'put',
                        body: JSON.stringify(track)
                    });

                    img.src = 'img/fill-heart-active.svg';
                } else {
                    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/favoriteTracks/${track.id}.json`, {
                        method: 'delete'
                    });

                    img.src = 'img/heart.svg';
                }
            } else {
                window.location.href = 'signin.html';
            }
        });

        if (document.getElementById(`anim-${track.id}`).scrollWidth > document.getElementById(`anim-${track.id}`).offsetWidth) {
            let keyframes = [
                { transform: `translateX(${document.getElementById(`anim-${track.id}`).scrollWidth}px)` },
                { transform: `translateX(${0 - document.getElementById(`anim-${track.id}`).scrollWidth}px)` }
            ];
            
            document.getElementById(`anim-${track.id}`).animate(keyframes, {
                duration: track.artists.length * 3000,
                iterations: Infinity
            });
        }
    });

    tracks.forEach((track) => {
        document.getElementById(`card-button-play-${track.id}`).addEventListener('click', () => {
            updatePlayerTracks(tracks, track);
        });
    });
}

export { getTracks }
