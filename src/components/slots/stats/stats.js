import { getUsername } from "../account/account.js";
import { loadFileToElement } from "../../../scripts/loadHtml.js";

const htmlTag = "stats";

const filePath = `components/slots/stats`;

let spins = 0;
let points = 0;


export async function displayUserStats() {

    let stats = await fetchStats();

    await loadFileToElement(`${filePath}/html/stats.html`, htmlTag);

    const nameLabel = document.getElementById('name');
    nameLabel.innerText = getUsername();
    
    const spinsLabel = document.getElementById('spins');
    spins = Number(stats['spins'])
    spinsLabel.innerText = 'Total Spins: ' + stats['spins'];

    const pointsLabel = document.getElementById('points');
    points = Number(stats['points'])
    pointsLabel.innerText = 'Points: ' + stats['points'];

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

export function subtractSpinCost() {
    points = points - 10;
    const pointsLabel = document.getElementById('points');
    pointsLabel.innerText = 'Points: ' + points;
}