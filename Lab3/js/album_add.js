function updateAlbumImage() {
    const files = document.getElementById('album-input-image').files;

    if (FileReader && files && files.length) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            document.getElementById('preview-image').src = fileReader.result;
        };
        fileReader.readAsDataURL(files[0]);
    }
}

let tracks = [];

function addTrack(event) {
    event.preventDefault();

    const track = {
        id: crypto.randomUUID(),
        title: 'Название'
    };
    tracks.push(track);
    const trackElement = document.createElement('li');
    trackElement.classList.add('cards__card');
    trackElement.id = track.id;
    trackElement.innerHTML = `
        <section class="card">
            <a class="cover-image">
                <img class="cover-image" src="img/upload.svg">
            </a>
            <div class="card__description">
                <p class="title" id="">Название</p>
                <a class="info-button" href="">
                    <p class="info"></p>
                </a>
            </div>
            <div class="card__buttons">
                <button class="icon-button icon-button_size_small">
                    <img class="icon-button__image" src="img/add-artist.svg">
                </button>
                <button class="icon-button icon-button_size_small">
                    <img class="icon-button__image" src="img/delete-artist.svg">
                </button>
                <button class="icon-button icon-button_size_small" id="album-track-delete-${track.id}">
                    <img class="icon-button__image" src="img/delete.svg">
                </button>
            </div>
        </section>
    `;

    document.getElementById('cards').appendChild(trackElement);

    function deleteAlbumTrack(event) {
        event.preventDefault();

        tracks = tracks.filter((t) => t.id != track.id);
        document.getElementById(track.id).remove();
    }

    document.getElementById(`album-track-delete-${track.id}`).addEventListener('click', deleteAlbumTrack);
}

document.getElementById('album-button-add-track').addEventListener('click', addTrack);
document.getElementById('album-input-image').addEventListener('change', updateAlbumImage);
document.getElementById('album-input-type').addEventListener('change', (event) => {
    console.log(event.target.value);
});
