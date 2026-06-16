


function loadHome() {
    const container = document.getElementById('root');
    container.innerHTML = '';

    const body = document.createElement('div');
    body.innerHTML = `
        <marquee scrollamount="10">WILL DOT COMPUTER ACTIVELY UNDER CONSTRUCTION! </marquee>
        <p>Welcome to my website! Here you will find blogs containing my ephemeral thoughts, good-enough photography, and statistics about my hobbies.
        <p>Use the navigation sidebar to discover mediocrity at its finest.</p>
        <p>Enjoy your stay!</p>
        <nav>
            <p><a onclick="loadBlogList()">Blogs</a></p>
            <p><a onclick="loadSmallWeb()">Small Web</a></p>
            <p><a onclick="loadServerHealth()">Server Health</a></p>
        </nav>
        
        <div style="max-height:1000px;">
            <marquee style="position:relative;left:122px;top:0px;height:397px;" scrollamount="6" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:8px;top:-397px;height:175px;" scrollamount="4" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:151px;top:-550px;height:235px;" scrollamount="5" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:51px;top:-735px;height:161px;" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:124px;top:-961px;height:337px;" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:122px;top:-1213px;height:397px;" scrollamount="7" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:55px;top:-1691px;height:231px;" scrollamount="5" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:98px;top:-1900px;height:127px;" scrollamount="6" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:93px;top:-2100px;height:355px;" scrollamount="1" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:279px;top:-2504px;height:475px;" scrollamount="4" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:185px;top:-2907px;height:373px;" scrollamount="1" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:140px;top:-3200px;height:296px;" scrollamount="7" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:26px;top:-3500px;height:300px;" scrollamount="3" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:22px;top:-3800px;height:253px;" scrollamount="6" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:211px;top:-4040px;height:325px;" scrollamount="7" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:203px;top:-4400px;height:481px;" scrollamount="5" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:107px;top:-4900px;height:330px;" scrollamount="2" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:132px;top:-5205px;height:331px;" scrollamount="5" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:57px;top:-5500px;height:94px;" scrollamount="5" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:5px;top:-5600px;height:471px;" direction="down">will.computer</marquee>
            <marquee style="position:relative;left:317px;top:-6003px;height:480px;" scrollamount="5" direction="down">will.computer</marquee>
        </div>
`
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
