let playlists = [
    {
        id: "1",
        title: "Zachillochka",
        description: "Чисто побалдеть для души",
        image: "https://assets.turbologo.ru/blog/ru/2022/03/15082250/06-958x575.png",
        tracks: [
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
        ],
        tracks_amount: 3
    },
];

function playPlaylist(id) {
    let playlist = playlists.filter(playlist => playlist.id == id)[0];
    currentTracks = playlist.tracks;
    trackIndex = 0;
    audio.src = currentTracks[trackIndex].src;
    isTrackPlaying = false;
    updatePlayerImagePlay();
    isTrackPlaying = true;
    audio.play();
}

function getPlaylists(playlists) {
    document.getElementById("cards").innerHTML = playlists.map(function (playlist) {
        return `
            <li class="cards__card">
                <a class="cards__a" href="playlist.html">
                    <section class="card">
                        <img class="cover-image" src="${playlist.image}">
                        <div class="card__description">
                            <p class="title">${playlist.title}</p>
                            <p class="info">${playlist.tracks_amount} треки</p>
                        </div>
                        <div class="card__buttons">
                            <button class="icon-button icon-button_size_small" onclick="playPlaylist(${playlist.id}); return false">
                                <img class="icon-button__image" src="img/forward.svg">
                            </button>
                        </div>
                    </section>
                </a>
            </li>
        `;
    }).join('');
}

getPlaylists(playlists);
