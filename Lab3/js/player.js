let isTrackPlaying = false;
let audio = new Audio("js/track.mp3");

audio.addEventListener("timeupdate", function() {
    let currentTime = Math.trunc(audio.currentTime);
    let duration = Math.trunc(audio.duration);

    let currentBar = document.getElementById("player-bar-current");
    currentBar.style.width = `${currentTime / duration * 100}%`;

    let currentMinutes = Math.trunc(currentTime / 60);
    let currentSeconds = currentTime % 60;
    document.getElementById("player-time-current").innerHTML = currentSeconds < 10 ? `${currentMinutes}:0${currentSeconds}` : `${currentMinutes}:${currentSeconds}`;

    let durationMinutes = Math.trunc(duration / 60);
    let durationSeconds = duration % 60;
    document.getElementById("player-time").innerHTML = durationSeconds < 10 ? `${durationMinutes}:0${durationSeconds}` : `${durationMinutes}:${durationSeconds}`;
});

document.getElementById("player-button-play").addEventListener("click", function() {
    if (isTrackPlaying) {
        isTrackPlaying = false;
        audio.pause();
    }
    else {
        isTrackPlaying = true;
        audio.play();
    }
});

document.getElementById("player-img-play").addEventListener("click", function() {
    var image = document.getElementById("player-img-play");

    if (isTrackPlaying) {
        image.src = "img/play.svg";
    }
    else {
        image.src = "img/pause.svg";
    }
});

document.getElementById("player-bar").addEventListener("click", function (event) {
    playerBar = document.getElementById("player-bar");
    audio.currentTime = audio.duration * event.offsetX / playerBar.offsetWidth;
});
