import {useState} from "react";
import {giveHint} from "../../helpers/gamelogic.js";

function HintButton({secretWords, revealedWords, setRevealedWords, setHintRevealedWords, hintsLeft, setHintsLeft}) {
    const [localHintsLeft, setLocalHintsLeft] = useState(hintsLeft);

    const handleGiveHint = () => {
        if (localHintsLeft > 0) {
            giveHint(secretWords, revealedWords, setRevealedWords, setHintRevealedWords, setHintsLeft, localHintsLeft);
            setLocalHintsLeft(prev => prev - 1); // ✅ Lokale hint-counter updaten
        }
    };

    return (
        <>
            <button onClick={handleGiveHint} disabled={localHintsLeft === 0}>
                Geef een hint
            </button>
            <p>Hints over: {localHintsLeft}</p>
        </>
    );
}

export default HintButton;
