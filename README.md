# Polyakov Kirill, 053502

# MusicPlayer

# Project description
The project will be a music player, something like Spotify.

# Mock up
Home page
![](https://github.com/groyvstreet/MusicPlayer/blob/main/Lab2/Home.png)

Profile page
![](https://github.com/groyvstreet/MusicPlayer/blob/main/Lab2/Profile.png)

Playlist page
![](https://github.com/groyvstreet/MusicPlayer/blob/main/Lab2/Playlist.png)

Login page
![](https://github.com/groyvstreet/MusicPlayer/blob/main/Lab2/Login.png)

# Main functions
1) Authorisation
2) Registration
3) Edit profile (avatar and personal data)
3) Play track (pause, back, forward)
4) Add/remove track to/from favorites
5) Create/edit/delete playlist
6) Search tracks by title and artist
7) Autoreplay track

# Data models description
User:
    id
    email
    username
    birthday
    avatar
    favorites_tracks
    favorites_tracks_amount
    playlists
    playlists_amount
    
Track:
    id
    title
    artists
    src
    
Artist:
    id
    nickname
    tracks_amount
    
