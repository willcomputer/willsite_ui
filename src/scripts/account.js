export let signedIn = false;
export let username = '';

const htmlTag = "account";

function display() {

    const loginButton = document.createElement('button');
    loginButton.onclick = displayLogin;
    loginButton.className = 'pushable';
    loginButton.innerHTML = `
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front"> Login </span>
    `;

    const signUpButton = document.createElement('button');
    signUpButton.onclick = displaySignUp;
    signUpButton.className = 'pushable';
    signUpButton.innerHTML = `
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front"> Sign Up </span>
    `;


    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'buttons';
    buttonContainer.appendChild(loginButton);
    buttonContainer.appendChild(signUpButton);

    // get the parent & add everything to parent 
    const parentContainer = document.getElementById(htmlTag);
    parentContainer.innerHTML = '';
    parentContainer.appendChild(buttonContainer);

}

function displaySignUp() {
    displayAccountControls(submitSignUp);
}

function displayLogin() {
    displayAccountControls(submitLogin);
}

function displayAccountControls(submitAction) {
    const usernameInput = document.createElement('input');
    usernameInput.id = 'username';
    usernameInput.placeholder = 'Username';

    const passwordInput = document.createElement('input');
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Password';

    const submitButton = document.createElement('button');
    submitButton.onclick = submitAction;
    submitButton.className = 'pushable';
    submitButton.innerHTML = `
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front"> Submit </span>
    `;


    const backButton = document.createElement('button');
    backButton.onclick = display;
    backButton.className = 'pushable';
    backButton.innerHTML = `
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front"> Back </span>
    `;


    const accountControlsContainer = document.createElement('div');
    accountControlsContainer.className = 'inputs';
    accountControlsContainer.appendChild(usernameInput);
    accountControlsContainer.appendChild(passwordInput);
    accountControlsContainer.appendChild(submitButton);
    accountControlsContainer.appendChild(backButton);


    // get the parent & add everything to parent 
    const parentContainer = document.getElementById(htmlTag);
    parentContainer.innerHTML = '';
    parentContainer.appendChild(accountControlsContainer);

}

async function submit(endpoint) {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (username == '' || password == '') {
        alert('Please fill out both username and password');
        return;
    }


    try {
        const response = await fetch('https://api.will.computer/' + endpoint);
        let res = await response.json();
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
    alert(endpoint);
}

function submitLogin() {
    submit('login');
}

function submitSignUp() {
    submit('signup');
}


display();