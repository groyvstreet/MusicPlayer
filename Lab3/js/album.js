const id = window.location.href.split('#')[1];

function loadAlbum() {
    fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums/${id}.json`)
        .then((response) => response.json())
        .then((album) => {
            document.getElementById('preview-image').src = album.image;
            document.getElementById('preview-h1').innerHTML = album.title;
            document.getElementById('preview-h2').innerHTML = `Треки: ${album.tracksAmount}`;
            document.getElementById('preview-h3').innerHTML = album.type;

            tracks = album.tracks;

            user.then((u) => {
                user = u;
                getTracks(album.tracks);
            });
        });
}

loadAlbum();

document.getElementById('search').addEventListener('change', (event) => {
    let searchedTracks = album.tracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(searchedTracks);
});
