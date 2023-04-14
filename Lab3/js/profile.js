import { isAuthenticated, user } from './app.js';

if (!isAuthenticated()) {
    window.location.href = 'signin.html';
} else {
    user.then((u) => {
        document.getElementById('profile-image').src = u.avatar;
        document.getElementById('profile-input-email').value = u.email;
        document.getElementById('profile-input-username').value = u.username;
        document.getElementById('profile-input-birthday').value = u.birthday.substring(0, 10);
        document.getElementById('profile-span-tracks').innerHTML = 'Любимые треки: ' + u.favoriteTracksAmount;
        document.getElementById('profile-span-playlists').innerHTML = 'Плейлисты: ' + u.playlistsAmount;
    
        document.getElementById('profile-button-save').addEventListener('click', async (event) => {
            event.preventDefault();
            u.email = document.getElementById('profile-input-email').value;
            u.username = document.getElementById('profile-input-username').value;
            u.birthday = document.getElementById('profile-input-birthday').value;
            
            let response = await fetch(`https://krakensound-ee3a2-default-rtdb.firebaseio.com/users/${localStorage.getItem('user_id')}.json`, {
                method: 'put',
                body: JSON.stringify(u)
            });
    
            if (response.ok) {
                alert('Изменения сохранены');
            }
        });

        document.getElementById('profile-button-logout').addEventListener('click', () => {
            document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            window.location.href = 'index.html';
        });
    });
}
