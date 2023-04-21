function artistToAddToAlbum(artist, toAdd, track) {
    const element = document.createElement('li');
    element.classList.add('cards__card');
    element.id = `album-track-artist-${artist.id}`;
    element.innerHTML = `
        <a class="cards__a">
            <section class="card">
                <img class="cover-image" src="${artist.image}">
                <div class="card__description">
                    <p class="title">${artist.nickname}</p>
                    <p class="info-p">Треки: ${artist.tracksAmount}</p>
                </div>
                <div class="card__buttons">
                    <button class="icon-button icon-button_size_small" id="album-track-artist-add-${artist.id}">
                        <img class="icon-button__image" src="${toAdd ? 'img/simple-plus.svg' : 'img/cancel.svg'}">
                    </button>
                </div>
            </section>
        </a>
    `;

    function addToTrack() {
        if (toAdd) {
            track.artists.push(artist);
        } else {
            track.artists = track.artists.filter((trackArtist) => trackArtist.id != artist.id);
        }

        element.remove();

        document.getElementById(`album-track-artists-${track.id}`).innerHTML = track.artists.map((artist) => {
            return `
                <a class="info__button" href="artist.html#${artist.id}">
                    <p class="info-p">${artist.nickname}</p>
                </a>
            `;
        }).join('&');

        document.getElementById(`album-track-${track.id}`).style.border = 'none';
    }

    element.getElementsByClassName('icon-button')[0].addEventListener('click', addToTrack);
    return element;
}

export { artistToAddToAlbum }
