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

async function addAlbum(album) {
    const response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/albums/${album.id}.json`, {
        method: 'put',
        body: JSON.stringify(album)
    });
    return response;
}

export { getAlbum, getAlbumsByArtist, getAlbums, addAlbum }
