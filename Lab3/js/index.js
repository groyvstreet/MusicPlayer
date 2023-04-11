let allTracks = [
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

let favoritesTracks = [
    {
        id: "1",
        title: "Gimme the loot",
        image: "https://www.teachhub.com/wp-content/uploads/2019/10/Our-Top-10-Songs-About-School-768x569.png",
        src: "js/track.mp3"
    },
    {
        id: "3",
        title: "Песня",
        image: "https://online.berklee.edu/takenote/wp-content/uploads/2022/01/how_to_write_a_love_song_article_image_2022-1.png",
        src: "https://cdn3.sefon.pro/prev/mfW6CHdvatwtULfZO2bHsw/1680822107/394/Artik%20%26%20Asti%20-%20Кукла%20%28192kbps%29.mp3"
    },
];

tracks = allTracks;
getTracks(allTracks);

document.getElementById("search").addEventListener("change", (event) => {
    tracks = allTracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(tracks);
});
