export async function checkGuess(query, setQuery, secretWords, revealedWords, setRevealedWords, setHintsLeft, setFeedbackMessage, setIsCorrect) {
    const normalizedQuery = query.trim().toLowerCase();
    const capitalizedWord = normalizedQuery.charAt(0).toUpperCase() + normalizedQuery.slice(1);
    const BACKEND_URL = "https://valentijnsproject.onrender.com";
    
    if (secretWords.some(word => word.toLowerCase() === normalizedQuery)) {
        if (revealedWords[capitalizedWord] !== capitalizedWord) {
            // ✅ Update de UI state
            const updatedRevealedWords = {
                ...revealedWords,
                [capitalizedWord]: capitalizedWord
            };
            setRevealedWords(updatedRevealedWords);
            setHintsLeft(prevHints => prevHints + 1);
            setFeedbackMessage("❤️‍🔥 Goed Zo!!! ❤️‍🔥 \n Je hebt een extra hint verdiend!");
            setIsCorrect(true);

            // ✅ Stuur het correct geraden woord naar de server
            try {
                const response = await fetch(`${BACKEND_URL}/save-word`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({word: capitalizedWord})
                });

                const data = await response.json();
                console.log("✅ Server response:", data);
            } catch (error) {
                console.error("❌ Error saving word to server:", error);
            }
        }
    } else {
        setFeedbackMessage("Dat is niet correct, probeer opnieuw!");
        setIsCorrect(false);
    }

    setQuery(""); // ✅ Zorg dat het invoerveld altijd wordt geleegd
}


export function giveHint(secretWords, revealedWords, setRevealedWords, setHintRevealedWords, setHintsLeft, hintsLeft) {
    if (hintsLeft > 0) {
        const hiddenWords = secretWords.filter(word => revealedWords[word].includes("_"));
        if (hiddenWords.length === 0) return;

        const randomWord = hiddenWords[Math.floor(Math.random() * hiddenWords.length)];
        const wordArray = revealedWords[randomWord].split("");
        let hiddenIndices = wordArray.map((char, i) => (char === "_" ? i : null)).filter(i => i !== null);

        if (hiddenIndices.length === 0) return;

        const randomIndex = hiddenIndices[Math.floor(Math.random() * hiddenIndices.length)];
        wordArray[randomIndex] = randomWord[randomIndex];

        setRevealedWords(prev => ({...prev, [randomWord]: wordArray.join("")}));
        setHintRevealedWords(prev => ({...prev, [randomWord]: true}));
        setHintsLeft(hintsLeft - 1);
    }
}
