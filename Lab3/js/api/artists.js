async function getArtist(id) {
    const response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists/${id}.json`);
    return response.json();
}

async function getArtists() {
    const response = await fetch('https://krakensound-ee3a2-default-rtdb.firebaseio.com/artists.json');
    return response.json();
}

export { getArtist, getArtists }
