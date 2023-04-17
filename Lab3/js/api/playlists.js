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

export { deletePlaylist, addPlaylist, updatePlaylist }
