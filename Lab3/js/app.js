localStorage.setItem("user_id", "1");

async function loadUser() {
    let response = await fetch("https://krakensound-ee3a2-default-rtdb.firebaseio.com/users.json");
    let users = await response.json();
    let user =  users.filter((user) => user.id == localStorage.getItem("user_id"))[0];

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
