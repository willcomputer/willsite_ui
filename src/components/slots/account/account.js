import { displayUserStats } from "../stats/stats.js";
import { loadFileToElement } from "../../../scripts/loadHtml.js";
import { displayRollButton } from "../machine/machine.js";

const filePath = `components/slots/account`;


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

async function display() {

    await loadFileToElement(`${filePath}/html/login-selection.html`, htmlTag);

    const loginButton = document.getElementById('login-button');
    loginButton.addEventListener("click", function() {
        displayLogin();
    });

    const signUpButton = document.getElementById('signup-button');
    signUpButton.addEventListener("click", function() {
        displaySignUp();
    });
}


function displaySignUp() {
    displayAccountControls(submitSignUp);
}

function displayLogin() {
    displayAccountControls(submitLogin);
}


async function displayAccountControls(submitAction) {

    await loadFileToElement(`${filePath}/html/login-inputs.html`, htmlTag);

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener("click", function() {
        submitAction();
    });

    const backButton = document.getElementById('back-button');
    backButton.addEventListener("click", function() {
        display();
    });
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
        displayRollButton();
    }
}

function displayLoading() {
    const loadingImg = document.createElement('img');
    loadingImg.setAttribute('src', 'assets/loading.gif');
    loadingImg.className = 'loading';
    
    const parentContainer = document.getElementById('inputs');
    parentContainer.innerHTML = '';
    parentContainer.appendChild(loadingImg);
}


function submitLogin() {
    submit('login');
}

function submitSignUp() {
    submit('signup');
}


function displayAccountError(message) {
    alert(message);
    display();
}



display();