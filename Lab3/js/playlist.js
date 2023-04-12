let id = window.location.href.split("#")[1];

user.then((u) => {
    let playlist = u.playlists[id];
    document.getElementById("preview-image").src = playlist.image;
    document.getElementById("preview-h1").innerHTML = playlist.title;
    document.getElementById("preview-h2").innerHTML = `Треки: ${playlist.tracks_amount}`;
    document.getElementById("preview-h3").innerHTML = playlist.description;
    document.getElementById("preview-button-edit").href = `playlist_edit.html#${playlist.id}`;
    
    tracks = playlist.tracks;
    getTracks(playlist.tracks);

    document.getElementById("search").addEventListener("change", (event) => {
        tracks = playlist.tracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
        getTracks(tracks);
    });
});
