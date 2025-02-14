import {useState} from "react";
import {giveHint} from "../../helpers/gamelogic.js";

function HintButton({secretWords, revealedWords, setRevealedWords, setHintRevealedWords, hintsLeft, setHintsLeft}) {
    const handleGiveHint = () => {
        if (hintsLeft > 0) {
            giveHint(secretWords, revealedWords, setRevealedWords, setHintRevealedWords, setHintsLeft, hintsLeft);
        }
    };

    return (
        <>
            <button className="button button-primary" onClick={handleGiveHint} disabled={hintsLeft === 0}>
                Geef een hint ({hintsLeft} over)
            </button>
        </>
    );
}


export default HintButton;
