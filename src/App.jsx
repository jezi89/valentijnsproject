import {useEffect, useState} from "react";
import Input from "./components/Input.jsx";
import JudithIs from "./components/JudithIs.jsx";
import createFloatingEmoji from "./helpers/loveEmojiGen.js";
import {checkGuess, giveHint} from "./helpers/gameLogic.js";
import Header from "./components/Header.jsx";
import HintButton from "./components/buttons/HintButton.jsx";


function App() {
    const secretWords = ["Lief", "Knap", "Spontaan", "Zorgzaam", "Avontuurlijk", "Sportief", "Gedreven", "Netjes", "Kalm", "Doorzetter"];
    const [query, setQuery] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [revealedWords, setRevealedWords] = useState(
        secretWords.reduce((acc, word) => {
            acc[word] = "_".repeat(word.length);
            return acc;
        }, {})
    );
    const [hintsLeft, setHintsLeft] = useState(3);
    const [isCorrect, setIsCorrect] = useState(null);
    const [hintRevealedWords, setHintRevealedWords] = useState({});
    const BACKEND_URL = "https://valentijnsproject.onrender.com";


    useEffect(() => {
        const fetchGameState = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/game-state`);


                const data = await response.json();

                setRevealedWords(prevWords => ({
                    ...prevWords,
                    ...data.guessedWords // ✅ Vul de lijst aan met opgehaalde woorden
                }));
                setHintsLeft(data.hintsLeft);
            } catch (error) {
                console.error("❌ Error fetching game state:", error);
            }
        };

        fetchGameState();
    }, []);

    useEffect(() => {
        const interval = setInterval(createFloatingEmoji, 4500);
        return () => clearInterval(interval);
    }, []);

    const resetGame = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/reset-game`, {method: "POST"});
            const data = await response.json();

            setRevealedWords(
                secretWords.reduce((acc, word) => {
                    acc[word] = "_".repeat(word.length);
                    return acc;
                }, {})
            );
            setHintsLeft(3);
            setFeedbackMessage("🔄 Game is gereset!");
            console.log("✅ Game reset:", data);
        } catch (error) {
            console.error("❌ Error resetting game:", error);
        }
    };


    return (
        <div className="heart-container">
            <div className="hero animated">
                <Header/>
                <Input placeholder="Raad een woord..."
                       query={query}
                       setQuery={setQuery}
                       setFeedbackMessage={setFeedbackMessage}
                       checkGuess={() => checkGuess(query, setQuery, secretWords, revealedWords, setRevealedWords, setHintsLeft, setFeedbackMessage, setIsCorrect)}
                       feedbackMessage={feedbackMessage}
                       isCorrect={isCorrect}
                />
                <JudithIs revealedWords={revealedWords}
                          hintRevealedWords={hintRevealedWords}
                />
                <HintButton
                    secretWords={secretWords}
                    revealedWords={revealedWords}
                    setRevealedWords={setRevealedWords}
                    setHintRevealedWords={setHintRevealedWords}
                    hintsLeft={hintsLeft}
                    setHintsLeft={setHintsLeft}
                />
                <div className="reset-button-container">
                    <button className="button button-primary" onClick={resetGame}>🔄 Reset Game</button>
                </div>

            </div>

        </div>
    );
}

export default App;
