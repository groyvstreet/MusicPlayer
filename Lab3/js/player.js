import { isAuthenticated, user } from "./app.js"
import { addTrackToFavorite, removeTrackFromFavorite } from "./api/tracks.js";
import { getAlbums } from "./api/albums.js";

let tracks = [];
let trackIndex = 0;
let isPlayerHidden = true;
let isTrackPlaying = false;
let toRepeat = false;
let isNewTrack = true;
let audio = new Audio();

function updateReplayButtonImage() {
    let image = document.getElementById('player-img-repeat');

    if (toRepeat) {
        image.src = 'img/repeat.svg';
    }
    else {
        image.src = 'img/repeat-active.svg';
    }
}

function switchReplayButton() {
    updateReplayButtonImage();
    toRepeat = !toRepeat;
}

function updateFavoriteButtonImage(isFilled) {
    let image = document.getElementById('player-img-favorite');

    if (isFilled) {
        image.src = 'img/heart.svg';
    }
    else {
        image.src = 'img/fill-heart-active.svg';
    }
}

function switchFavoriteButton() {
    if (isAuthenticated()) {
        const track = tracks[trackIndex];

        user.then((u) => {
            if (u.favoriteTracks.filter((t) => t.id == track.id).length == 0) {
                updateFavoriteButtonImage(false);
                addTrackToFavorite(u.id, track);
                u.favoriteTracks.push({ id: track.id});
            } else {
                updateFavoriteButtonImage(true);
                removeTrackFromFavorite(u.id, track);
                u.favoriteTracks = u.favoriteTracks.filter((t) => t.id != track.id);
            }
        });
    } else {
        window.location.href = 'signin.html';
    }
}

function updatePlayButtonImage() {
    var image = document.getElementById('player-img-play');

    if (isTrackPlaying) {
        image.src = 'img/play.svg';
    }
    else {
        image.src = 'img/pause.svg';
    }
}

function switchPlayButton() {
    updatePlayButtonImage();

    if (isTrackPlaying) {
        isTrackPlaying = false;
        audio.pause();
    }
    else {
        isTrackPlaying = true;
        audio.play();
    }
}

function playTrack() {
    audio.src = tracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayButtonImage();
    isTrackPlaying = true;
    isNewTrack = true;
    audio.play();
}

function selectPreviousTrack() {
    trackIndex -= 1;

    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }

    playTrack();
}

function selectNextTrack() {
    trackIndex += 1;

    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }

    playTrack();
}

function updatePlayerTracks(newTracks, track) {
    if (isPlayerHidden) {
        isPlayerHidden = false;

        let keyframes = [
            { transform: 'translateY(-100px)' }
        ];

        document.getElementById('player').animate(keyframes, {
            duration: 200,
            fill: 'forwards',
            timingFunction: 'ease-in'
        });
    }

    tracks = newTracks;
    trackIndex = tracks.indexOf(track);
    playTrack();
}

function disablePlayer() {
    const nodes = document.getElementById('player').getElementsByTagName('*');

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
    }
}

function enablePlayer() {
    const nodes = document.getElementById('player').getElementsByTagName('*');
    
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].disabled = false;
    }
}

async function updatePlayerTrack(track) {
    disablePlayer();

    let albums = await getAlbums();
    albums = Object.values(albums);
    const album = albums.filter((album) => album.tracks.filter((t) => t.id == track.id).length != 0)[0];
    const button = document.getElementById('player-button-cover-image');
    button.href = `album.html#${album.id}`;

    const image = document.getElementById('player-cover-image');
    image.src = track.image;

    const title = document.getElementById('player-title');
    title.innerHTML = track.title;

    user.then((u) => {
        const img = document.getElementById('player-img-favorite');
        
        if (u.favoriteTracks.filter((t) => t.id == track.id).length == 0) {
            img.src = 'img/heart.svg';
        } else {
            img.src = 'img/fill-heart-active.svg';
        }
    });

    document.getElementById('player-artists').innerHTML = track.artists.map((artist) => {
        return `
            <a class="info__button" href="artist.html#${artist.id}">
                <p class="info-p">${artist.nickname}</p>
            </a>
        `;
    }).join('&');

    if (document.getElementById('player-artists').scrollWidth > document.getElementById('player-artists').offsetWidth) {
        let keyframes = [
            { transform: 'translateX(0)' },
            { transform: `translateX(${0 - document.getElementById('player-artists').scrollWidth + document.getElementById('player-artists').offsetWidth}px)` },
            { transform: 'translateX(0)' }
        ];
        
        document.getElementById('player-artists').animate(keyframes, {
            duration: track.artists.length * 3000,
            iterations: Infinity,
            timingFunction: 'linear'
        });
    }

    enablePlayer();
}

function updatePlayer() {
    let currentTime = Math.trunc(audio.currentTime);
    let duration = Math.trunc(audio.duration);

    let currentBar = document.getElementById('player-bar-current');
    currentBar.style.width = `${currentTime / duration * 100}%`;

    let currentMinutes = Math.trunc(currentTime / 60);
    let currentSeconds = currentTime % 60;
    document.getElementById('player-time-current').innerHTML = currentSeconds < 10 ? `${currentMinutes}:0${currentSeconds}` : `${currentMinutes}:${currentSeconds}`;

    if (duration.toString() != 'NaN') {
        let durationMinutes = Math.trunc(duration / 60);
        let durationSeconds = duration % 60;
        document.getElementById('player-time').innerHTML = durationSeconds < 10 ? `${durationMinutes}:0${durationSeconds}` : `${durationMinutes}:${durationSeconds}`;
    }

    if (isNewTrack) {
        isNewTrack = false;
        updatePlayerTrack(tracks[trackIndex]);
    }

    if (currentTime == duration) {
        if (toRepeat) {
            audio.currentTime = 0;
        }
        else {
            selectNextTrack();
        }
    }
}

audio.addEventListener('timeupdate', updatePlayer);

document.getElementById('player-button-repeat').addEventListener('click', switchReplayButton);

document.getElementById('player-button-favorite').addEventListener('click', switchFavoriteButton);

document.getElementById('player-button-play').addEventListener('click', switchPlayButton);

document.getElementById('player-button-back').addEventListener('click', selectPreviousTrack);

document.getElementById('player-button-forward').addEventListener('click', selectNextTrack);

document.getElementById('player-bar').addEventListener('click', (event) => {
    const playerBar = document.getElementById('player-bar');
    audio.currentTime = audio.duration * event.offsetX / playerBar.offsetWidth;
});

export { updatePlayerTracks }
