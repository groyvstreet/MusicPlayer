let id = window.location.href.split('#')[1];

user.then((u) => {
    let playlist = u.playlists[id];

    if (playlist.tracks == undefined) {
        playlist.tracks = [];
    }

    document.getElementById('preview-image').src = playlist.image;
    document.getElementById('preview-h1').innerHTML = playlist.title;
    document.getElementById('preview-h2').innerHTML = `Треки: ${playlist.tracksAmount}`;
    document.getElementById('preview-h3').innerHTML = playlist.description;
    document.getElementById('preview-button-edit').href = `playlist_edit.html#${playlist.id}`;
    
    tracks = playlist.tracks;
    getTracks(playlist.tracks);

    document.getElementById('search').addEventListener('change', (event) => {
        tracks = playlist.tracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
        getTracks(tracks);
    });

    document.getElementById('preview-button-delete').addEventListener('click', async () => {
        let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}/playlists/${id}.json`, {method: 'delete'});
        
        if (response.ok) {
            window.location.href = 'playlists.html';
        }
    });
});
