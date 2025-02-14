const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5070;

app.use(express.json());
app.use(cors());

const secretWords = ["Lief", "Knap", "Spontaan", "Zorgzaam", "Avontuurlijk", "Sportief", "Gedreven", "Netjes", "Kalm", "Doorzetter"];

const gameStateFile = 'gameState.json';

// ✅ Game state laden bij serverstart
let gameState = {guessedWords: {}, hintsLeft: 3};
if (fs.existsSync(gameStateFile)) {
    const savedState = JSON.parse(fs.readFileSync(gameStateFile, 'utf8'));
    gameState = {...gameState, ...savedState}; // ✅ Zorgt ervoor dat hintsLeft behouden blijft
}

// ✅ Functie om game state op te slaan
function saveGameState() {
    fs.writeFileSync(gameStateFile, JSON.stringify(gameState, null, 2));
}

// ✅ GET: Haal de game state op
app.get('/game-state', (req, res) => {
    let fullGameState = {
        guessedWords: {...gameState.guessedWords},
        hintsLeft: gameState.hintsLeft
    };

    // ✅ Vul ontbrekende woorden aan met "_"
    secretWords.forEach(word => {
        if (!fullGameState.guessedWords[word]) {
            fullGameState.guessedWords[word] = "_".repeat(word.length);
        }
    });

    res.status(200).send(fullGameState);
});

// ✅ POST: Sla een correct woord op
app.post('/save-word', (req, res) => {
    const {word} = req.body;

    if (word && secretWords.includes(word)) {
        gameState.guessedWords[word] = word;
        saveGameState(); // ✅ Sla de game state op na update
        console.log(`✅ Saved word: ${word}`);
        res.status(200).send({message: 'Word saved successfully!', gameState});
    } else {
        res.status(400).send({message: 'Invalid word or no word provided!'});
    }
});

// ✅ POST: Reset de game
app.post('/reset-game', (req, res) => {
    gameState = {guessedWords: {}, hintsLeft: 3};
    saveGameState();
    console.log("🔄 Game reset!");
    res.status(200).send({message: 'Game reset successfully!', gameState});
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
