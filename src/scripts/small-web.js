function loadSmallWeb() {
    const container = document.getElementById('root');
    container.innerHTML = '';
    const body = document.createElement('div');



    body.innerHTML = `
    <p><a target="_blank" href="https://nate-griffith.com/">https://nate-griffith.com/</a></p> 
    <p><a target="_blank" href="https://www.ethanshealey.com/">https://www.ethanshealey.com/</a></p> 
    <p><a target="_blank" href="https://avery-clark.netlify.app/">https://avery-clark.netlify.app/</a></p>
    `;
    container.appendChild(body);
}