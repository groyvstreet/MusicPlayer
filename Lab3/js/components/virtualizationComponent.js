function virtualizationComponent(parent, data, componentForData, args) {
    const HEIGHT = 70;

    let elementsAmount = window.innerHeight / HEIGHT;

    let index = 0;

    for (; index < elementsAmount && index < data.length; index++) {
        parent.appendChild(componentForData(data[index], ...args));
    }

    window.onscroll = () => {
        elementsAmount += (window.innerHeight + window.scrollY - elementsAmount * HEIGHT) / HEIGHT;

        for (; index < elementsAmount && index < data.length; index++) {
            parent.appendChild(componentForData(data[index], ...args));
        }
    };
}

export { virtualizationComponent }
