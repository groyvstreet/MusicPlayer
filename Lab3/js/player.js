import { isAuthenticated, user } from "./app.js"

let tracks = [];
let trackIndex = 0;
let isTrackPlaying = false;
let toRepeat = false;
let audio = new Audio();

let nodes = document.getElementById('player').getElementsByTagName('*');
for (let i = 0; i < nodes.length; i++) {
    nodes[i].disabled = true;
}

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

function addTrackToFavorite(track) {
    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/favoriteTracks/${track.id}.json`, {
        method: 'put',
        body: JSON.stringify(track)
    });
}

function removeTrackFromFavorite(track) {
    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/favoriteTracks/${track.id}.json`, {
        method: 'delete'
    });
}

function switchFavoriteButton() {
    if (isAuthenticated()) {
        const track = tracks[trackIndex];

        user.then((u) => {
            if (u.favoriteTracks.filter((t) => t.id == track.id).length == 0) {
                addTrackToFavorite(track);
                u.favoriteTracks.push({ id: track.id});
            } else {
                removeTrackFromFavorite(track);
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
    tracks = newTracks;
    trackIndex = tracks.indexOf(track);
    playTrack();
}

function updatePlayerTrack(track) {
    fetch('https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json')
        .then((response) => response.json())
        .then((data) => {
            const albums = Object.values(data);
            const album = albums.filter((album) => album.tracks.filter((t) => t.id == track.id).length != 0)[0];
            const button = document.getElementById('player-button-cover-image');
            button.href = `album.html#${album.id}`;
        });

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
}

audio.addEventListener('timeupdate', function() {
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

    updatePlayerTrack(tracks[trackIndex]);

    if (currentTime == duration) {
        if (toRepeat) {
            audio.currentTime = 0;
        }
        else {
            selectNextTrack();
        }
    }

    let nodes = document.getElementById('player').getElementsByTagName('*');
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].disabled = false;
    }
});

document.getElementById('player-button-repeat').addEventListener('click', switchReplayButton);

document.getElementById('player-button-favorite').addEventListener('click', switchFavoriteButton);

document.getElementById('player-button-play').addEventListener('click', switchPlayButton);

document.getElementById('player-button-back').addEventListener('click', selectPreviousTrack);

document.getElementById('player-button-forward').addEventListener('click', selectNextTrack);

document.getElementById('player-bar').addEventListener('click', function (event) {
    const playerBar = document.getElementById('player-bar');
    audio.currentTime = audio.duration * event.offsetX / playerBar.offsetWidth;
});

export { updatePlayerTracks }
