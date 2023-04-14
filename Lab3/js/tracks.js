import { isAuthenticated } from "./app.js";
import { updatePlayerTracks } from "./player.js";

// function playTrack(tracks, id) {
//     let track = tracks.filter(track => track.id == id)[0];
//     trackIndex = tracks.indexOf(track);
//     currentTracks = tracks;
//     audio.src = currentTracks[trackIndex].src;
//     isTrackPlaying = false;
//     updatePlayerImagePlay();
//     isTrackPlaying = true;
//     audio.play();
// }

function getImage(user, id) {
    if (user.favoriteTracks.filter(track => track.id == id).length == 0) {
        return 'img/heart.svg';
    } else {
        return 'img/fill-heart-active.svg';
    }
}

// function updateTrack(id) {
//     let button = document.querySelector(`[onclick="updateTrack('${id}')"]`);
//     let img = button.getElementsByTagName('img')[0];

//     if (user.favoriteTracks.filter(track => track.id == id).length == 0) {
//         fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/favoriteTracks/${id}.json`, {
//             method: 'put',
//             body: JSON.stringify(tracks.filter(track => track.id == id)[0])
//         });

//         img.src = 'img/fill-heart-active.svg';
//     } else {
//         fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/favoriteTracks/${id}.json`, {
//             method: 'delete',
//             body: JSON.stringify(tracks.filter(track => track.id == id)[0])
//         });

//         img.src = 'img/heart.svg';
//     }
// }

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
                        <a class="info-button" href="artist.html">
                            <p class="info">Исполнитель</p>
                        </a>
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
    });

    tracks.forEach((track) => {
        document.getElementById(`card-button-play-${track.id}`).addEventListener('click', () => {
            //let track = tracks.filter(track => track.id == id)[0];
            updatePlayerTracks(tracks, track);
        });
    });
}

export { getTracks }
