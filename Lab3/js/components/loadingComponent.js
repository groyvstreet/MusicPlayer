async function loadingComponent(callback, args) {
    if (args == null || args == undefined) {
        args = [];
    }

    const element = document.createElement('div');
    element.classList.add('modal');
    element.style.display = 'flex';
    element.id = 'loading-screen';
    element.innerHTML = 'Loading...';
    document.body.appendChild(element);

    await callback(...args);

    element.style.display = 'none';
}

export { loadingComponent }
