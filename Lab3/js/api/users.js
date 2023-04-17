async function putUser(user) {
    return await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${user.id}.json`, {
        method: 'put',
        body: JSON.stringify(user)
    });
}

export { putUser }
