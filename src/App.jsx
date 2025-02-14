import {useEffect, useState} from "react";
import Input from "./components/Input.jsx";
import JudithIs from "./components/JudithIs.jsx";
import createFloatingEmoji from "./helpers/loveEmojiGen.js";

function App() {
    const secretWords = ["Lief", "Knap", "Spontaan", "Zorgzaam", "Avontuurlijk", "Sportief", "Gedreven", "Netjes", "Kalm", "Doorzetter"];

    const [query, setQuery] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState(""); // ✅ Nieuwe naam


    const [revealedWords, setRevealedWords] = useState(
        secretWords.reduce((acc, word) => {
            acc[word] = "_".repeat(word.length);
            return acc;
        }, {})
    );
    const [hintsLeft, setHintsLeft] = useState(10);
    const [isCorrect, setIsCorrect] = useState(null);  // Bepaalt of het antwoord goed is
    const [hintRevealedWords, setHintRevealedWords] = useState({});  // Houdt bij welke woorden via een hint zijn onthuld

    function checkGuess() {
        const normalizedQuery = query.trim().toLowerCase();
        const capitalizedWord = normalizedQuery.charAt(0).toUpperCase() + normalizedQuery.slice(1);


        if (secretWords.some(word => word.toLowerCase() === normalizedQuery)) {
            if (revealedWords[capitalizedWord] !== capitalizedWord) {
                setRevealedWords(prevRevealedWords => ({
                    ...prevRevealedWords,
                    [capitalizedWord]: capitalizedWord
                }));

                setHintsLeft(prevHints => prevHints + 1); // ✅ Extra hint verdienen bij goed antwoord
                setFeedbackMessage("❤️‍🔥 Goed Zo!!! ❤️‍🔥 \nJe hebt een extra hint verdiend!");

                setIsCorrect(true); // ✅ Goed antwoord
            }
        } else {
            setFeedbackMessage("Dat is niet correct, probeer opnieuw!"); // ✅ Toon foutmelding
            setIsCorrect(false); // ❌ Fout antwoord
        }

        setQuery(""); // ✅ Zorg dat het invoerveld altijd wordt geleegd
    }

    function giveHint() {
        if (hintsLeft > 0) {
            const hiddenWords = secretWords.filter(
                word => revealedWords[word].includes("_")
            );
            if (hiddenWords.length === 0) return;

            const randomWord = hiddenWords[Math.floor(Math.random() * hiddenWords.length)];
            const wordArray = revealedWords[randomWord].split("");
            let hiddenIndices = wordArray
                .map((char, i) => (char === "_" ? i : null))
                .filter(i => i !== null);

            if (hiddenIndices.length === 0) return;

            const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
            wordArray[randomIndex] = randomWord[randomIndex];

            setRevealedWords(prevRevealedWords => ({
                ...prevRevealedWords,
                [randomWord]: wordArray.join("")
            }));

            setHintRevealedWords(prev => ({
                ...prev,
                [randomWord]: true // ✅ Markeer als via hint onthuld
            }));

            setHintsLeft(hintsLeft - 1);
        }
    }


    useEffect(() => {
        const interval = setInterval(createFloatingEmoji, 4500); // Elke 2.5 sec een emoji
        return () => clearInterval(interval);
    }, []);


    return (

        <div className="heart-container">

            <div className="hero">
                <h1>Waarom houdt Jerôme van jou?!</h1>
                <Input placeholder="Raad een woord..." query={query} setQuery={setQuery}
                       checkGuess={checkGuess} feedbackMessage={feedbackMessage}
                       isCorrect={isCorrect} /* ✅ Doorsturen naar Input *//>
                <JudithIs
                    revealedWords={revealedWords}
                    hintRevealedWords={hintRevealedWords} /* ✅ Doorsturen naar JudithIs */
                    giveHint={giveHint}
                    hintsLeft={hintsLeft}
                />
            </div>
        </div>

    );
}

export default App;
