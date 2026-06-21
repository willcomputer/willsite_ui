import { isSignedIn, getUsername, getToken } from './account.js';
import { displayUserStats } from './stats.js';

const htmlTag = "slots";

const symbols = ['bar.png', 'bell.png', 'cherry.png', 'seven.png'];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function roll() {

    document.getElementById('spin-button').disabled = true;
    setTimeout(() => document.getElementById('spin-button').disabled = false, 4000);

    let backendResponse = await backendRoll();

    if (accountCheck()) {
        runLoop(1, 2000, backendResponse[0]);
        runLoop(2, 2500, backendResponse[1]);
        runLoop(3, 3500, backendResponse[2]);
    } else {
        alert('You need to sign in to play')
        console.log('You need to sign in to play')
    }
    setTimeout(() => displayUserStats(), 4000)

}

function accountCheck() {
    return isSignedIn;
}

function getSymbolPath(symbolType) {
    return 'slot-symbols/' + symbolType + '.png';
}

function getRandomSymbol() {
    return 'slot-symbols/' + symbols[Math.floor(Math.random() * symbols.length)];
}

function changeSymbol(symbol, position) {
    const symbolTag = document.getElementById('position-' + position);
    symbolTag.setAttribute('src', 'assets/' + symbol);
}

async function runLoop(position, rollTimeMs, finalSymbol) {

    const startTime = Date.now();

    while (Date.now() - startTime < rollTimeMs) {
        changeSymbol(getRandomSymbol(), position);
        await sleep(40);
    }
    changeSymbol(getSymbolPath(finalSymbol), position);
}

function display() {

    // Create the slot symbols
    let symbolOne = createSymbolContainer(1);
    let symbolTwo = createSymbolContainer(2);
    let symbolThree = createSymbolContainer(3);

    // create symbol container & add symbols to it
    let symbolContainer = document.createElement('div');
    symbolContainer.id = 'symbols-container';
    symbolContainer.appendChild(symbolOne);
    symbolContainer.appendChild(symbolTwo);
    symbolContainer.appendChild(symbolThree);

    // create the button 
    let button = document.createElement('button');
    button.id = 'spin-button';
    button.onclick = () => roll();
    button.className = 'pushable';
    button.innerHTML = `
        <span class="shadow"></span>
        <span class="edge"></span>
        <span class="front"> Spin! </span>
    `;

    // create the button container & add button to it
    let buttonContainer = document.createElement('div');
    buttonContainer.className = 'center-div';
    buttonContainer.appendChild(button);


    // get the parent & add everything to parent 
    const parentContainer = document.getElementById(htmlTag);
    parentContainer.innerHTML = '';
    parentContainer.appendChild(symbolContainer);
    parentContainer.appendChild(buttonContainer);

}


function createSymbolContainer(position) {
    let symbolContainer = document.createElement('div');

    let symbol = document.createElement('img');
    symbol.setAttribute('src', 'assets/' + getRandomSymbol());
    symbol.id = "position-" + position;
    symbolContainer.className = 'symbol'

    symbolContainer.appendChild(symbol);

    return symbolContainer;
}

async function backendRoll() {
    if (getUsername() == '' || getToken() == '') {
        alert('Please relogin.');
        return;
    }

    try {
        const url = new URL('https://api.will.computer/roll');
        url.search = new URLSearchParams({
            username: getUsername(),
            token: getToken()
        }).toString();

        const response = await fetch(url);
        let res = await response.json();

        if (response.ok) {
            return res;
        } else {
            console.log(res['message']);
        }

    } catch (error) {
        console.error('Error handling roll:', error);
    }

}



display();