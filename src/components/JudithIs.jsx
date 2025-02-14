function JudithIs({revealedWords, hintRevealedWords, giveHint, hintsLeft}) {
    return (
        <>
            <div className="word-list-container">
                <h3 className="word-list-title">Hij vindt jou (een):</h3>
                <ul className="word-list">
                    {Object.keys(revealedWords).map((word, index) => (
                        <li key={index}
                            className={`${
                                revealedWords[word] !== "_".repeat(word.length)
                                    ? hintRevealedWords[word] ? "hint-revealed" : "revealed"
                                    : ""
                            }`}
                        >
                            {revealedWords[word]}
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={giveHint} disabled={hintsLeft === 0}>
                Geef een hint
            </button>
            <h4> (nog {hintsLeft} over)</h4>
        </>
    );
}

export default JudithIs;
