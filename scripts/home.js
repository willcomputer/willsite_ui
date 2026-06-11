function loadHome() {
    const container = document.getElementById('root');
    container.innerHTML = '';

    const body = document.createElement('div');
    body.innerHTML = '<p>Home Page</p><p>Lots to do here...</p>';

    container.appendChild(body);

}

loadHome();