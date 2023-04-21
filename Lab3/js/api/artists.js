async function getArtist(id) {
    const response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists/${id}.json`);
    return response.json();
}

async function getArtists() {
    const response = await fetch('https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists.json');
    return response.json();
}

async function addArtist(id, username) {
    const artist = {
        id: id,
        image: 'img/cover-image.jpg',
        nickname: username,
        tracksAmount: 0
    };
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists/${id}.json`, {
        method: 'put',
        body: JSON.stringify(artist)
    });
}

async function updateArtist(artist) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists/${artist.id}.json`, {
        method: 'put',
        body: JSON.stringify(artist)
    });
}

export { getArtist, getArtists, addArtist, updateArtist }
