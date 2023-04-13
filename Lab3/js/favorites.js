user.then((u) => {
    user = u;
    getTracks(u.favoriteTracks);
});

document.getElementById('search').addEventListener('change', (event) => {
    let searchedTracks = favoritesTracks.filter(track => track.title.toLowerCase().includes(event.target.value.toLowerCase()));
    getTracks(searchedTracks);
});
