async function getAlbum(id) {
    const response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums/${id}.json`);
    return response.json();
}

async function getAlbumsByArtist(artistId) {
    const response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json?orderBy="artist/id"&equalTo="${artistId}"`);
    return response.json();
}

async function getAlbums() {
    const response = await fetch('https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums.json');
    return response.json();
}

export { getAlbum, getAlbumsByArtist, getAlbums }
