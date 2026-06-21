import { getUsername } from "./account.js";

const htmlTag = "stats";


export async function displayUserStats() {


    let stats = await fetchStats();

    let usernameTag = document.createElement('h1');
    usernameTag.innerText = getUsername();


    let spinsTag = document.createElement('h2');
    spinsTag.innerText = 'Total Spins: ' + stats['spins'];

    let pointsTag = document.createElement('h2');
    pointsTag.innerText = 'Points: ' + stats['points'];


    let statContainer = document.createElement('div');
    statContainer.className = 'inputs';
    statContainer.appendChild(usernameTag);
    statContainer.appendChild(spinsTag);
    statContainer.appendChild(pointsTag);

    // get the parent & add everything to parent 
    const parentContainer = document.getElementById(htmlTag);
    parentContainer.innerHTML = '';
    parentContainer.appendChild(statContainer);
}


async function fetchStats() {
    if (getUsername() == '') {
        alert('Please relogin.');
        return;
    }

    try {
        const url = new URL('https://api.will.computer/stats');
        url.search = new URLSearchParams({
            username: getUsername(),
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