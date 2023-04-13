let id = window.location.href.split("#")[1];

function loadAlbum() {
    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums/${id}.json`)
        .then((response) => response.json())
        .then((album) => {
            document.getElementById("preview-image").src = album.image;
            document.getElementById("preview-h1").innerHTML = album.title;
            document.getElementById("preview-h2").innerHTML = `Треки: ${album.tracks_amount}`;
            document.getElementById("preview-h3").innerHTML = album.type;

            tracks = album.tracks;
            getTracks(album.tracks);
        });
}

loadAlbum();

document.getElementById("search").addEventListener("change", (event) => {
    tracks = album.tracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(tracks);
});
