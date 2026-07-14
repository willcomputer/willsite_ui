import { isSignedIn, getUsername, getToken } from '../account/account.js';
import { displayUserStats, subtractSpinCost } from '../stats/stats.js';
import { loadFileToElement } from '../../../scripts/loadHtml.js';

import * as Sounds from '../../../scripts/audio.js';

const filePath = `components/slots/machine`;

const htmlTag = "slots";

const symbols = ['single-bar.png', 'double-bar.png', 'triple-bar.png', 'bell.png', 'cherry.png', 'seven.png'];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function roll() {

    document.getElementById('spin-button').disabled = true;
    setTimeout(() => document.getElementById('spin-button').disabled = false, 4000);
    subtractSpinCost()
    let backendResponse = await backendRoll();

    if (accountCheck()) {
        Sounds.playSpin();
        runLoop(1, 2000, backendResponse.roll[0]);
        runLoop(2, 2500, backendResponse.roll[1]);
        runLoop(3, 3100, backendResponse.roll[2]);
    } else {
        alert('You need to sign in to play')
        console.log('You need to sign in to play')
    }
    setTimeout(() => playSound(backendResponse.score), 3300)
    setTimeout(() => flashScore(backendResponse.score), 3300)
    setTimeout(() => displayUserStats(), 3300)

}

function playSound(score) {
    if (score == 0) {
        Sounds.playLose()
    } else if (score < 50) {
        Sounds.playSmallWin()
    } else if (score >= 50) {
        Sounds.playBigWin()
    }
}

function accountCheck() {
    return isSignedIn();
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

async function display() {

    await loadFileToElement(`${filePath}/html/machine.html`, htmlTag);

    const spinButton = document.getElementById('spin-button');
    spinButton.addEventListener("click", function() {
        roll();
    });
    displayRollButton();
}


export function displayRollButton() {
    const spinButton = document.getElementById('spin-button');
    spinButton.hidden = !isSignedIn()
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

function flashScore(points) {
    const popup = document.getElementById("score-popup");
    popup.textContent = `+${points}`;

    // Restart animation
    popup.classList.remove("show");
    void popup.offsetWidth; // Force reflow
    popup.classList.add("show");
}



display();