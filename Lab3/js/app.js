function isAuthenticated() {
    if (document.cookie.includes('user=')) {
        return true;
    } else {
        return false;
    }
}

//document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
//document.cookie = 'role=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
//alert(document.cookie)

function updateUser() {
    if (document.cookie.includes('user=')) {
        const params = document.cookie.split(';');
        const user_id = params[0].split('=')[1];
        const user_role = params[1].split('=')[1];
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('user_role', user_role);
    } else {
        localStorage.setItem('user_id', 'null');
        localStorage.setItem('user_role', 'null');
    }
}

async function loadUser() {
    updateUser();

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

if (localStorage.getItem('user_role') == 'artist') {
    const li = document.createElement('li');
    const child = document.getElementById('nav-elems').appendChild(li);
    child.classList.add('nav__elem');
    child.innerHTML = `
        <a class="" href="album_add.html">
            <img class="nav__elem-image" src="img/plus.svg">
        </a>
    `;
}

if (isAuthenticated()) {
    user.then((u) => {
        document.getElementById('nav-profile-image').src = u.avatar;
    });
} else {
    document.getElementById('nav-favorites').href = 'signin.html';
    document.getElementById('nav-playlists').href = 'signin.html';
    document.getElementById('nav-profile').href = 'signin.html';
}

export { isAuthenticated, user }
