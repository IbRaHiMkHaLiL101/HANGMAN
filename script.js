const categories = {
    marvel: ["thor", "hulk", "ironman", "spiderman", "loki", "thanos", "vision", "wanda", "doctor strange", "falcon"],
    football: ["lionel messi", "cristiano ronaldo", "neymar", "mbappe", "lewandowski", "ronaldinho", "maradona", "pele", "beckham"],
    basketball: ["michael jordan", "lebron james", "kobe bryant", "shaq", "kevin durant", "stephen curry", "james harden", "tim duncan", "larry bird", "magic johnson"],
    tvShows: ["friends", "breaking bad", "sherlock", "stranger things", "the office", "seinfeld", "game of thrones", "lost", "dark"]
};

let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

const maxWrongGuesses = 5;

function startGame() {
    // Get the selected category from the dropdown
    const category = document.getElementById('category').value;

    // Select a random word from the chosen category
    selectedWord = categories[category][Math.floor(Math.random() * categories[category].length)];
    guessedLetters = [];
    wrongGuesses = 0;

    // Hide category selection and show game area
    document.getElementById('category-selection').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';

    // Reset and start the game
    document.getElementById('message').textContent = '';
    
    generateWord();
    generateButtons();
    updateHearts();
}

function generateWord() {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = selectedWord
        .split('')
        .map(letter => (letter === ' ' ? '&nbsp;' : (guessedLetters.includes(letter) ? letter : '_')))
        .join(' ');
}

function generateButtons() {
    const lettersContainer = document.getElementById('letters-container');
    lettersContainer.innerHTML = '';

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.classList.add('letter-btn');
        button.onclick = () => guessLetter(letter);
        lettersContainer.appendChild(button);
    });
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses) {
        return;
    }

    guessedLetters.push(letter);

    if (selectedWord.includes(letter)) {
        generateWord();
        checkWin();
    } else {
        wrongGuesses++;
        updateHearts();
        if (wrongGuesses === maxWrongGuesses) {
            endGame(false);
        }
    }

    // Disable the button after it's been clicked
    document.querySelectorAll('.letter-btn').forEach(btn => {
        if (btn.textContent === letter) {
            btn.disabled = true;
        }
    });
}

function updateHearts() {
    const heartsContainer = document.getElementById('hearts-container');
    heartsContainer.innerHTML = '❤️'.repeat(maxWrongGuesses - wrongGuesses) + '🖤'.repeat(wrongGuesses);
}

function checkWin() {
    const wordContainer = document.getElementById('word-container').textContent.replace(/\s/g, '');
    const formattedWord = selectedWord.replace(/\s/g, '');
    if (wordContainer === formattedWord) {
        endGame(true);
    }
}

function endGame(win) {
    const message = document.getElementById('message');
    if (win) {
        message.textContent = 'You Win! 🎉';
    } else {
        message.textContent = `Game Over! The word was "${selectedWord}". 😞`;
    }

    // Disable all buttons after the game ends
    document.querySelectorAll('.letter-btn').forEach(button => button.disabled = true);
}

function restartGame() {
    // Reset the game and show category selection again
    document.getElementById('category-selection').style.display = 'block';
    document.getElementById('game-area').style.display = 'none';
    document.getElementById('letters-container').innerHTML = '';
    document.getElementById('word-container').textContent = '';
    document.getElementById('hearts-container').textContent = '';
}

// No automatic start



