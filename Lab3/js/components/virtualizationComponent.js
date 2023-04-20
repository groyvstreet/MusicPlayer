function virtualizationComponent(parent, data, componentForData, args) {
    let elementsAmount = window.innerHeight / 70;

    //const parent = document.createDocumentFragment();
    let index = 0;

    for (; index < elementsAmount && index < data.length; index++) {
        parent.appendChild(componentForData(data[index], ...args));
    }

    window.onscroll = () => {
        elementsAmount += (window.innerHeight + window.scrollY) / 70;

        for (; index < elementsAmount && index < data.length; index++) {
            parent.appendChild(componentForData(data[index], ...args));
        }
    };
}

export { virtualizationComponent }
