async function deletePlaylist(userId, id) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${userId}/playlists/${id}.json`, {
        method: 'delete'
    });
}

export { deletePlaylist }
