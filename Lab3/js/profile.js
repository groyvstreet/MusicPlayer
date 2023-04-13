user.then((u) => {
    document.getElementById("profile-image").src = u.avatar;
    document.getElementById("profile-input-email").value = u.email;
    document.getElementById("profile-input-username").value = u.username;
    document.getElementById("profile-input-birthday").value = u.birthday.substring(0, 10);
    document.getElementById("profile-span-tracks").innerHTML = 'Любимые треки: ' + u.favorite_tracks_amount;
    document.getElementById("profile-span-playlists").innerHTML = 'Плейлисты: ' + u.playlists_amount;

    document.getElementById("profile-button-save").addEventListener("click", async (event) => {
        event.preventDefault();
        u.email = document.getElementById("profile-input-email").value;
        u.username = document.getElementById("profile-input-username").value;
        u.birthday = document.getElementById("profile-input-birthday").value;
        
        let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem("user_id")}.json`, {
            method: "put",
            body: JSON.stringify(u)
        });

        if (response.ok) {
            alert('Изменения сохранены');
        }
    });
});
