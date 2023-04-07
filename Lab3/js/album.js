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

let id = window.location.href.split("#")[1];

let album = albums.filter(album => album.id == id)[0];

document.getElementById("preview-image").src = album.image;
document.getElementById("preview-h1").innerHTML = album.title;
document.getElementById("preview-h2").innerHTML = `Треки: ${album.tracks_amount}`;
document.getElementById("preview-h3").innerHTML = album.type;

getTracks(album.tracks);
