function virtualizationComponent(parent, data, componentForData, args, container) {
    const HEIGHT = 70;

    let elementsAmount;

    if (container == null || container == undefined) {
        elementsAmount = window.innerHeight / HEIGHT;
    } else {
        elementsAmount = container.offsetHeight / HEIGHT;
    }

    let index = 0;

    for (; index < elementsAmount && index < data.length; index++) {
        parent.appendChild(componentForData(data[index], ...args));
    }

    if (container == null || container == undefined) {
        window.onscroll = () => {
            elementsAmount += (window.innerHeight + window.scrollY - elementsAmount * HEIGHT) / HEIGHT;

            for (; index < elementsAmount && index < data.length; index++) {
                parent.appendChild(componentForData(data[index], ...args));
            }
        };
    } else {
        container.onscroll = () => {
            elementsAmount += (container.offsetHeight + container.scrollTop - elementsAmount * HEIGHT) / HEIGHT;

            for (; index < elementsAmount && index < data.length; index++) {
                parent.appendChild(componentForData(data[index], ...args));
            }
        }
    }
}

export { virtualizationComponent }
