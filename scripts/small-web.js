function loadSmallWeb() {
    const container = document.getElementById('root');
    container.innerHTML = '';
    const body = document.createElement('div');

    body.innerHTML = `
    <h2>Small Web</h2>

    <p>I really enjoy the idea of the "small web" where people take more control of their online footprint by posting things through a personal website, like this one, instead of social media.</p>
    <p>It allows people more freedom to design and present themselves online exactly how they want to be presented. The only limitation is your own imagination, not some silly social media framework!</p>
    <p>It brings a smile to my face knowing some of my friends share this idea with me and have made their own websites. To show my appreciation, I wanted to provide a corner on my website to shine a spotlight on their stuff. Go check them out! </p>

    <h3>My Friend's Websites</h3>

    <p><a target="_blank" href="https://nate-griffith.com/">https://nate-griffith.com/</a></p> 
    <p><a target="_blank" href="https://www.ethanshealey.com/">https://www.ethanshealey.com/</a></p> 
    <p><a target="_blank" href="https://avery-clark.netlify.app/">https://avery-clark.netlify.app/</a></p>
    `;
    container.appendChild(body);
}