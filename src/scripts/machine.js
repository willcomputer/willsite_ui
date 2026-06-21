const htmlID = "slots";

const symbols = ['bar.png', 'bell.png', 'cherry.png', 'seven.png'];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function roll() {
    runLoop(1, 2000);
    runLoop(2, 2500);
    runLoop(3, 3000);
}

function getRandomSymbol() {
    return 'slot-symbols/' + symbols[Math.floor(Math.random() * symbols.length)];
}

function changeSymbol(symbol, position) {
    const symbolTag = document.getElementById('position-' + position);
    symbolTag.setAttribute('src', 'assets/' + symbol);
}

async function runLoop(position, rollTimeMs) {

    const startTime = Date.now();
    console.log("Loop started...");

    // Spin random fruit
    while (Date.now() - startTime < rollTimeMs) {
        changeSymbol(getRandomSymbol(), position);
        await sleep(40);
    }

    // Show final fruit here

}

function display(tagName, fruit) {

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

    let announcement = document.createElement('div');
    announcement.className = 'center-div';
    announcement.innerHTML = '<p>DEMO MODE! More features like accounts and credits coming soon...</p>';

    // get the parent & add everything to parent 
    const parentContainer = document.getElementById(tagName);
    parentContainer.innerHTML = '';
    parentContainer.appendChild(symbolContainer);
    parentContainer.appendChild(buttonContainer);
    parentContainer.appendChild(announcement);


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



display(htmlID, "banana");