let id = window.location.href.split("#")[1];

user.then((u) => {
    let playlist = u.playlists[id];
    document.getElementById("preview-image").src = playlist.image;
    document.getElementById("playlist-title").value = playlist.title;
    document.getElementById("playlist-description").value = playlist.description;

    document.getElementById("playlist-button-save").addEventListener("click", async (event) => {
        event.preventDefault();
        playlist.title = document.getElementById("playlist-title").value;
        playlist.description = document.getElementById("playlist-description").value;
        
        let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem("user_id")}/playlists/${id}.json`, {
            method: "patch",
            body: JSON.stringify(playlist)
        });

        console.log(response);
    });
});
