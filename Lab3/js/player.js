let tracks = [
    {
        id: "1",
        title: "Gimme the loot",
        image: "https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png",
        src: "js/track.mp3"
    },
    {
        id: "2",
        title: "Song",
        image: "https://play-lh.googleusercontent.com/QovZ-E3Uxm4EvjacN-Cv1LnjEv-x5SqFFB5BbhGIwXI_KorjFhEHahRZcXFC6P40Xg",
        src: "https://cdn8.sefon.pro/prev/TivTlpcRzwyZ7uBiqN-FYA/1680822107/393/Александр%20Кендысь%20feat.%20W.J.Rec%20-%20Кинолента%20%28192kbps%29.mp3"
    },
    {
        id: "3",
        title: "Песня",
        image: "https://online.berklee.edu/takenote/wp-content/uploads/2022/01/how_to_write_a_love_song_article_image_2022-1.png",
        src: "https://cdn3.sefon.pro/prev/mfW6CHdvatwtULfZO2bHsw/1680822107/394/Artik%20%26%20Asti%20-%20Кукла%20%28192kbps%29.mp3"
    },
];

let trackIndex = 0;
let isTrackPlaying = false;
let toRepeat = false;
let audio = new Audio(tracks[trackIndex].src);

function updatePlayerTrack(track) {
    var image = document.getElementById("player-cover-image");
    image.src = track.image;

    var title = document.getElementById("player-title");
    title.innerHTML = track.title;
}

function selectPreviousTrack() {
    trackIndex -= 1;

    if (trackIndex < 0) {
        trackIndex = tracks.length - 1;
    }

    audio.src = tracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function selectNextTrack() {
    trackIndex += 1;

    if (trackIndex > tracks.length - 1) {
        trackIndex = 0;
    }

    audio.src = tracks[trackIndex].src;
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

    updatePlayerTrack(tracks[trackIndex]);

    if (currentTime == duration) {
        if (toRepeat) {
            audio.currentTime = 0;
        }
        else {
            selectNextTrack();
        }
    }
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

document.getElementById("player-img-play").addEventListener("click", updatePlayerImagePlay);

document.getElementById("player-bar").addEventListener("click", function (event) {
    playerBar = document.getElementById("player-bar");
    audio.currentTime = audio.duration * event.offsetX / playerBar.offsetWidth;
});

document.getElementById("player-back-button").addEventListener("click", selectPreviousTrack);
document.getElementById("player-forward-button").addEventListener("click", selectNextTrack);
document.getElementById("player-button-repeat").addEventListener("click", function() {
    toRepeat = !toRepeat;
});
document.getElementById("player-img-repeat").addEventListener("click", function() {
    var image = document.getElementById("player-img-repeat");

    if (toRepeat) {
        image.src = "img/repeat.svg";
    }
    else {
        image.src = "img/repeat-active.svg";
    }
});
