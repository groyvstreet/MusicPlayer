let albums = [
    {
        id: "1",
        title: "One More City",
        type: "Альбом",
        image: "https://i.scdn.co/image/ab67616d00001e029f024146ab6cf494af72c091",
        tracks: [
            {
                id: "11",
                title: "Девочка-пришелец",
                image: "https://i.scdn.co/image/ab67616d00001e029f024146ab6cf494af72c091",
                src: "https://cdn6.sefon.pro/prev/YQ_tyO4LghjNcM-qPdoG6g/1680872053/195/ЛСП%20-%20Девочка-Пришелец%20%28192kbps%29.mp3",
                artists: [
                    {
                        id: "1",
                        nickname: "ЛСП",
                        image: "https://i.scdn.co/image/ab6761610000f178f3bf0f0db7be411cc9bb6515",
                        tracks_amount: 3
                    },
                ]
            },
            {
                id: "12",
                title: "Парный дурак",
                image: "https://i.scdn.co/image/ab67616d00001e029f024146ab6cf494af72c091",
                src: "https://dl2.mp3party.net/online/9621889.mp3",
                artists: [
                    {
                        id: "1",
                        nickname: "ЛСП",
                        image: "https://i.scdn.co/image/ab6761610000f178f3bf0f0db7be411cc9bb6515",
                        tracks_amount: 3
                    },
                ]
            },
            {
                id: "13",
                title: "Ууу",
                image: "https://i.scdn.co/image/ab67616d00001e029f024146ab6cf494af72c091",
                src: "https://cdn7.sefon.pro/prev/3dsu-a6cm6oy8yFTlVd6rQ/1680872593/195/%D0%9B%D0%A1%D0%9F%20-%20%D0%A3%D1%83%D1%83%20%28192kbps%29.mp3",
                artists: [
                    {
                        id: "1",
                        nickname: "ЛСП",
                        image: "https://i.scdn.co/image/ab6761610000f178f3bf0f0db7be411cc9bb6515",
                        tracks_amount: 3
                    },
                ]
            },
        ],
        tracks_amount: 15,
        artist: {
            id: "1",
            nickname: "ЛСП",
            image: "https://i.scdn.co/image/ab6761610000f178f3bf0f0db7be411cc9bb6515",
            tracks_amount: 3
        },
    },
];

function playAlbum(id) {
    let album = albums.filter(album => album.id == id)[0];
    trackIndex = 0;
    currentTracks = album.tracks;
    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function getAlbums(albums) {
    document.getElementById("cards").innerHTML = albums.map(function (album) {
        return `
            <li class="cards__card">
                <a class="cards__a" href="album.html#${album.id}">
                    <section class="card">
                        <img class="cover-image" src="${album.image}">
                        <div class="card__description">
                            <p class="title">${album.title}</p>
                            <p class="info">${album.type}</p>
                        </div>
                        <div class="card__buttons">
                            <button class="icon-button icon-button_size_small" onclick="playAlbum(${album.id}); return false">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');
}

getAlbums(albums.filter(album => album.artist.id == artist.id));
