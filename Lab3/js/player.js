let currentTracks = [];

let trackIndex = 0;
let isTrackPlaying = false;
let toRepeat = false;
let audio = new Audio("");

let nodes = document.getElementById("player").getElementsByTagName("*");
for (let i = 0; i < nodes.length; i++) {
    nodes[i].disabled = true;
}

function updatePlayerTrack(track) {
    var image = document.getElementById("player-cover-image");
    image.src = track.image;

    var title = document.getElementById("player-title");
    title.innerHTML = track.title;
}

function selectPreviousTrack() {
    trackIndex -= 1;

    if (trackIndex < 0) {
        trackIndex = currentTracks.length - 1;
    }

    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function selectNextTrack() {
    trackIndex += 1;

    if (trackIndex > currentTracks.length - 1) {
        trackIndex = 0;
    }

    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function updatePlayerImagePlay() {
    var image = document.getElementById("player-img-play");

    if (isTrackPlaying) {
        image.src = "img/play.svg";
    }
    else {
        image.src = "img/pause.svg";
    }
}

function updatePlayerImageRepeat() {
    var image = document.getElementById("player-img-repeat");

    if (toRepeat) {
        image.src = "img/repeat.svg";
    }
    else {
        image.src = "img/repeat-active.svg";
    }
}

audio.addEventListener("timeupdate", function() {
    let currentTime = Math.trunc(audio.currentTime);
    let duration = Math.trunc(audio.duration);

    let currentBar = document.getElementById("player-bar-current");
    currentBar.style.width = `${currentTime / duration * 100}%`;

    let currentMinutes = Math.trunc(currentTime / 60);
    let currentSeconds = currentTime % 60;
    document.getElementById("player-time-current").innerHTML = currentSeconds < 10 ? `${currentMinutes}:0${currentSeconds}` : `${currentMinutes}:${currentSeconds}`;

    if (duration.toString() != "NaN") {
        let durationMinutes = Math.trunc(duration / 60);
        let durationSeconds = duration % 60;
        document.getElementById("player-time").innerHTML = durationSeconds < 10 ? `${durationMinutes}:0${durationSeconds}` : `${durationMinutes}:${durationSeconds}`;
    }

    updatePlayerTrack(currentTracks[trackIndex]);

    if (currentTime == duration) {
        if (toRepeat) {
            audio.currentTime = 0;
        }
        else {
            selectNextTrack();
        }
    }

    let nodes = document.getElementById("player").getElementsByTagName("*");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].disabled = false;
    }
});

document.getElementById("player-button-play").addEventListener("click", function() {
    updatePlayerImagePlay();

    if (isTrackPlaying) {
        isTrackPlaying = false;
        audio.pause();
    }
    else {
        isTrackPlaying = true;
        audio.play();
    }
});

document.getElementById("player-bar").addEventListener("click", function (event) {
    playerBar = document.getElementById("player-bar");
    audio.currentTime = audio.duration * event.offsetX / playerBar.offsetWidth;
});

document.getElementById("player-back-button").addEventListener("click", selectPreviousTrack);
document.getElementById("player-forward-button").addEventListener("click", selectNextTrack);
document.getElementById("player-button-repeat").addEventListener("click", function() {
    updatePlayerImageRepeat();
    toRepeat = !toRepeat;
});
