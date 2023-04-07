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

let id = window.location.href.split("#")[1];

let album = albums.filter(album => album.id == id)[0];

document.getElementById("preview-image").src = album.image;
document.getElementById("preview-h1").innerHTML = album.title;
document.getElementById("preview-h2").innerHTML = `Треки: ${album.tracks_amount}`;
document.getElementById("preview-h3").innerHTML = album.type;

tracks = album.tracks;
getTracks(album.tracks);

document.getElementById("search").addEventListener("change", (event) => {
    tracks = album.tracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(tracks);
});
