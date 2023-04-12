localStorage.setItem("user_id", "ebac5a1a-d920-11ed-afa1-0242ac120002");

async function loadUser() {
    let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem("user_id")}.json`);
    let user = await response.json();

    if (user.favorite_tracks == undefined) {
        user.favorite_tracks = [];
    }

    if (user.playlists == undefined) {
        user.playlists = [];
    }

    return user;
}

let user = loadUser();

user.then((u) => {
    user = u;
});
