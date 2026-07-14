import { loadFileToElement } from '../../../scripts/loadHtml.js';

const htmlTag = "scoring-key";
const filePath = `components/slots/scoring-key`;



async function display() {
    await loadFileToElement(`${filePath}/html/scoring-key.html`, htmlTag);

}

display()