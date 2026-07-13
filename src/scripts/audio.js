
const AUDIO_PATH = '../assets/audio'

function playSound(file) {
    const audio = new Audio(`${AUDIO_PATH}/${file}`);
    audio.play();
}

export function playSpin() {
    playSound('spinning.wav')
}

export function playSmallWin() {
    playSound('small-win.wav')
}

export function playBigWin() {
    playSound('big-win.wav')
}

export function playLose() {
    playSound('lose.wav')
}

export function playRareLose() {
    playSound('rare-lose.mp3')
}

