import { displayUserStats } from "./stats.js";

export function isSignedIn() {
    return signedIn;
}

export function getUsername() {
    return username;
}
export function getToken() {
    return sessionToken;
}

let signedIn = false;
let username = '';
let sessionToken = '';
const htmlTag = "account";

function display() {

    let announcement = document.createElement('div');
    announcement.className = 'center-div';
    announcement.innerHTML = '<p>Before you spin, get signed in!</p>';

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
    parentContainer.appendChild(announcement);
    parentContainer.appendChild(buttonContainer);

}

function displayLoading() {
    const loadingImg = document.createElement('img');
    loadingImg.setAttribute('src', 'assets/loading.gif');
    loadingImg.className = 'loading';
    
    const parentContainer = document.getElementById('inputs');
    parentContainer.innerHTML = '';
    parentContainer.appendChild(loadingImg);
}

function clearLoading() {
    // alert("done loading")
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
    passwordInput.type = 'password'

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
    accountControlsContainer.id = 'inputs';
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
    let local_username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if (local_username == '' || password == '') {
        alert('Please fill out both username and password');
        return;
    }

    displayLoading()
    try {
        const url = new URL('https://api.will.computer/' + endpoint);
        url.search = new URLSearchParams({
            username: local_username,
            password: password,
        }).toString();

        const response = await fetch(url);
        let res = await response.json();
    
        if (response.ok) {
            console.log('Successfully logged in.')
            sessionToken = res['session'];
            signedIn = true;
            username = local_username;
            document.getElementById(htmlTag).innerHTML = ''
            displayUserStats();


        } else {
            console.log(res);
            let message = res['message'];
            displayAccountError(message);
        }

    } catch (error) {
        console.error('Error handling account:', error);
    } finally {
        clearLoading()
    }
}

function submitLogin() {
    submit('login');
}

function submitSignUp() {
    submit('signup');
}


function displayAccountError(message) {

}



display();