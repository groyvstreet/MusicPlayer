async function addTrackToFavorite(userId, track) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/favoriteTracks/${track.id}.json`, {
        method: 'put',
        body: JSON.stringify(track)
    });
}

async function removeTrackFromFavorite(userId, track) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/favoriteTracks/${track.id}.json`, {
        method: 'delete'
    });
}

export { addTrackToFavorite, removeTrackFromFavorite }
