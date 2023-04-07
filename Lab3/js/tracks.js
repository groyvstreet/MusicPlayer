function playTrack(id) {
    let track = tracks.filter(track => track.id == id)[0];
    trackIndex = tracks.indexOf(track);
    currentTracks = tracks;
    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function getImage(id) {
    if (favoritesTracks.filter(track => track.id == id).length == 0) {
        return "img/heart.svg";
    } else {
        return "img/fill-heart-active.svg";
    }
}

function updateTrack(id) {
    let button = document.querySelector(`[onclick="updateTrack(${id})"]`);
    let img = button.getElementsByTagName("img")[0];

    if (favoritesTracks.filter(track => track.id == id).length == 0) {
        favoritesTracks.push({id: id});
        img.src = "img/fill-heart-active.svg";
    } else {
        favoritesTracks = favoritesTracks.filter(track => track.id != id);
        img.src = "img/heart.svg";
    }
}

function getTracks(tracks) {
    document.getElementById("cards").innerHTML = tracks.map(function (track) {
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
                        <button class="icon-button icon-button_size_small" onclick="updateTrack(${track.id})">
                            <img class="icon-button__image" src="${getImage(track.id)}">
                        </button>
                        <button class="icon-button icon-button_size_small" onclick="return playTrack(${track.id})">
                            <img class="icon-button__image" src="img/forward.svg">
                        </button>
                    </div>
                </section>
            </li>
        `;
    }).join('');
}
