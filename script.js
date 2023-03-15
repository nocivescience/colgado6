const partsElement = document.querySelectorAll('.figure-part');
const wordElement = document.querySelector('.word');
const notification = document.querySelector('.notification-container');
const popup = document.querySelector('.popup-container');
const words = ['constitucion', 'decreto', 'derecho', 'juzgados','defensor','fiscal','proceso'];
const wrongLettersElement = document.getElementById('wrong-letters');
const playAgainButton = document.getElementById('play-button');
const finalMessage = document.querySelector('.final-message');
let selectedWord = words[Math.floor(Math.random() * words.length)];
correctLetters = [];
wrongLetters = [];
function displayWord(){
    wordElement.innerHTML = selectedWord
        .split('')
        .map(letter => `<h1 class="letter">${
            correctLetters.includes(letter) ? letter : ''
        }</h1>`)
        .join('');
    const innerWord = wordElement.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won! 😃';
        popup.style.display = 'flex';
    }
}
function updateWrongLettersElement(){
    wrongLettersElement.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;
    partsElement.forEach((part, index) => {
        const errors = wrongLetters.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });
    if (wrongLetters.length === partsElement.length) {
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = 'flex';
    }
}
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
};
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersElement();
            } else {
                showNotification();
            }
        }
    }
});
playAgainButton.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLettersElement();
    popup.style.display = 'none';
});
displayWord();