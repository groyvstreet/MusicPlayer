user.then((u) => {
    user = u;
    tracks = u.favoriteTracks;
    getTracks(u.favoriteTracks);
});

document.getElementById('search').addEventListener('change', (event) => {
    tracks = favoritesTracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(tracks);
});
