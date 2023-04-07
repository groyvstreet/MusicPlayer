let artists = [
    {
        id: "1",
        nickname: "ЛСП",
        image: "https://i.scdn.co/image/ab6761610000f178f3bf0f0db7be411cc9bb6515",
        tracks_amount: 3
    },
    {
        id: "2",
        nickname: "Big Baby Tape",
        image: "https://i.scdn.co/image/ab6761610000f178e689fe5b3724107b34cbb743",
        tracks_amount: 3
    },
];

let testTracks = [
    {
        id: "1",
        title: "Gimme the loot",
        image: "https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png",
        src: "js/track.mp3",
        artists: [
            {
                id: "2",
                nickname: "Big Baby Tape",
                image: "https://i.scdn.co/image/ab6761610000f178f3bf0f0db7be411cc9bb6515",
                tracks_amount: 3
            },
        ]
    },
    {
        id: "2",
        title: "Song",
        image: "https://play-lh.googleusercontent.com/QovZ-E3Uxm4EvjacN-Cv1LnjEv-x5SqFFB5BbhGIwXI_KorjFhEHahRZcXFC6P40Xg",
        src: "https://cdn8.sefon.pro/prev/TivTlpcRzwyZ7uBiqN-FYA/1680822107/393/Александр%20Кендысь%20feat.%20W.J.Rec%20-%20Кинолента%20%28192kbps%29.mp3",
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
        id: "3",
        title: "Песня",
        image: "https://online.berklee.edu/takenote/wp-content/uploads/2022/01/how_to_write_a_love_song_article_image_2022-1.png",
        src: "https://cdn3.sefon.pro/prev/mfW6CHdvatwtULfZO2bHsw/1680822107/394/Artik%20%26%20Asti%20-%20Кукла%20%28192kbps%29.mp3",
        artists: [
            {
                id: "1",
                nickname: "ЛСП",
                image: "https://i.scdn.co/image/ab6761610000f178f3bf0f0db7be411cc9bb6515",
                tracks_amount: 3
            },
        ]
    },
];

function playArtist(id) {
    let artistTracks = testTracks.filter(track => track.artists.some(artist => artist.id == id));
    currentTracks = artistTracks;
    trackIndex = 0;
    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function getArtists(artists) {
    document.getElementById("cards").innerHTML = artists.map(function (artist) {
        return `
            <li class="cards__card">
                <a class="cards__a" href="artist.html#${artist.id}">
                    <section class="card">
                        <img class="cover-image" src="${artist.image}">
                        <div class="card__description">
                            <p class="title">${artist.nickname}</p>
                            <p class="info">Треки: ${artist.tracks_amount}</p>
                        </div>
                        <div class="card__buttons">
                            <button class="icon-button icon-button_size_small" onclick="playArtist(${artist.id}); return false">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');
}

getArtists(artists);

document.getElementById("search").addEventListener("change", (event) => {
    let searchedArtists = artists.filter(artist => artist.nickname.toLowerCase().includes(event.target.value.toLowerCase()));
    getArtists(searchedArtists);
});
