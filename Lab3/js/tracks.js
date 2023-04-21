import { virtualizationComponent } from "./components/virtualizationComponent.js";
import { trackComponent } from "./components/trackComponent.js";

function renderTracks(user, tracks) {
    document.getElementById('cards').replaceChildren();
    virtualizationComponent(document.getElementById('cards'), tracks, trackComponent, [user, tracks]);
}

const modal = document.getElementById('modal');

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

export { renderTracks }
