let allTracks = [];

tracks = [];

async function loadTracks() {
    fetch("https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json")
        .then((response) => response.json())
        .then((albums) => {
            albums.map((album) => {
                allTracks = allTracks.concat(album.tracks);
            });
            user.then((u) => {
                user = u;
                tracks = allTracks;
                getTracks(allTracks);
            });
        });
}

loadTracks();

document.getElementById("search").addEventListener("change", (event) => {
    tracks = allTracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    user.then((u) => {
        getTracks(tracks);
    });
});
