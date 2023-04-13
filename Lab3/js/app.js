function isAuthenticated() {
    if (document.cookie.includes('user=')) {
        return true;
    } else {
        return false;
    }
}

function updateUserId() {
    if (document.cookie.includes('user=')) {
        localStorage.setItem('user_id', document.cookie.split('=')[1]);
    } else {
        localStorage.setItem('user_id', 'null');
    }
}

// document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
// alert(document.cookie)

//localStorage.setItem('user_id', 'ebac5a1a-d920-11ed-afa1-0242ac120002');

async function loadUser() {
    updateUserId();

    if (localStorage.getItem('user_id') == 'null') {
        return {
            favoriteTracks: [],
            playlists: []
        };
    }

    let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`);
    let user = await response.json();

    if (user.favoriteTracks == undefined) {
        user.favoriteTracks = [];
    } else {
        user.favoriteTracks = Object.values(user.favoriteTracks);
    }

    if (user.playlists == undefined) {
        user.playlists = [];
    }

    return user;
}

let user = loadUser();

export { isAuthenticated, user }
