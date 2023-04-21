async function deletePlaylist(userId, id) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/playlists/${id}.json`, {
        method: 'delete'
    });
}

async function addPlaylist(userId) {
    const id = crypto.randomUUID();
    const playlist = {
        id: id,
        title: 'Плейлист',
        description: '',
        image: 'img/cover-image.jpg',
        tracksAmount: 0
    };
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/playlists/${id}.json`, {
        method: 'put',
        body: JSON.stringify(playlist)
    });
}

async function updatePlaylist(userId, playlist) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/playlists/${playlist.id}.json`, {
        method: 'put',
        body: JSON.stringify(playlist)
    });
}

async function addTrackToPlaylist(userId, playlistId, track) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/playlists/${playlistId}/tracks/${track.id}.json`, {
        method: 'put',
        body: JSON.stringify(track)
    });
}

async function updatePlaylistTracksAmount(userId, playlistId, tracksAmount) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/playlists/${playlistId}/tracksAmount.json`, {
        method: 'put',
        body: JSON.stringify(tracksAmount)
    });
}

async function deleteTrackFromPlaylist(userId, playlistId, trackId) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/playlists/${playlistId}/tracks/${trackId}.json`, {
        method: 'delete'
    });
}

export { deletePlaylist, addPlaylist, updatePlaylist, addTrackToPlaylist, updatePlaylistTracksAmount, deleteTrackFromPlaylist }
