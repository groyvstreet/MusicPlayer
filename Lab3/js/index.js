let allTracks = [];

tracks = [];

function loadTracks() {
    fetch('https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json')
        .then((response) => response.json())
        .then((albums) => {
            let a = Object.values(albums);
            a.map((album) => {
                allTracks = allTracks.concat(album.tracks);
            });
            tracks = allTracks;

            user.then((u) => {
                user = u;
                getTracks(allTracks);
            });
        });
}

loadTracks();

document.getElementById('search').addEventListener('change', (event) => {
    tracks = allTracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(tracks);
});
