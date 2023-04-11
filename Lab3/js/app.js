localStorage.setItem("user_id", "1");

async function loadUser() {
    const user = fetch("https://krakensound-ee3a2-default-rtdb.firebaseio.com/users.json")
        .then((response) => response.json())
        .then((users) => {
            return users.filter((user) => user.id == localStorage.getItem("user_id"))[0];
        });
    return user;
}

let user = loadUser();

function getUser() {
    user.then((u) => {
        getTracks(tracks);
    });
};

//getUser();
