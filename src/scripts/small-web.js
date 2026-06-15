
const sites = [

    {
        name: "nate-griffith.com",
        url: "https://nate-griffith.com/"
    },

    {
        name: "ethanshealey.com",
        url: "https://ethanshealey.com/"
    },
    
    {
        name: "avery-clark.netlify.app",
        url: "https://avery-clark.netlify.app/"
    }

]



function loadSmallWeb() {
    const container = document.getElementById('root');
    container.innerHTML = '';
    const innerContainer = document.createElement('div');

    let backButton = document.createElement('p');
    backButton.innerHTML = `<p><a onclick="loadHome()">Return Home</a></p>`;
    innerContainer.appendChild(backButton);

    sites.forEach(site => {
        let tag = document.createElement('p');
        tag.innerHTML = `<a target="_blank" href="${site.url}">${site.name}</a>`;
        innerContainer.appendChild(tag);

    })

    container.appendChild(innerContainer);
}