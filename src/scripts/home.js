


function loadHome() {
    const container = document.getElementById('root');
    container.innerHTML = '';

    const body = document.createElement('div');
    body.innerHTML = `
        <p>Welcome to my website! Here you will find blogs containing my ephemeral thoughts, good-enough photography, and statistics about my hobbies.
        <p>Use the navigation sidebar to discover mediocrity at its finest.</p>
        <p>Enjoy your stay!</p>
        <nav>
            <p><a onclick="loadBlogList()">Blogs</a></p>
            <p><a onclick="loadSmallWeb()">Small Web</a></p>
            <p><a onclick="loadServerHealth()">Server Health</a></p>
        </nav>`
    container.appendChild(body);
}

async function updateEmail() {
    try {
        let email = document.getElementById('email-input').value;
        document.getElementById('email-input').value = "";
        const response = await fetch(`https://api.will.computer/add-email?email=${email}`);
        let backendReponse = await response.json();

        let emailDiv = document.getElementById('email');

        let responseMessage = document.createElement('p');
        responseMessage.setAttribute("id", "responseMessage");

        if (backendReponse["message"] == true) {  
            responseMessage.innerHTML = 'Successfully subscribed!';
        } else {
            responseMessage.innerHTML = 'Failed, please try again later';
        }
        emailDiv.appendChild(responseMessage);

        setTimeout(() => {
            document.getElementById('responseMessage').remove();
        }, 5000)
    } catch (error) {
        console.error('Error adding email:', error);
    }
}

loadHome();
