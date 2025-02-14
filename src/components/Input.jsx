import {useEffect, useState} from 'react';

function Input({query, setQuery, checkGuess, feedbackMessage, setFeedbackMessage, isCorrect, placeholder}) {
    // const [visibleMessage, setVisibleMessage] = useState(feedbackMessage);

    useEffect(() => {
        // if (feedbackMessage) {
        //     setVisibleMessage(feedbackMessage);
        const timeout = setTimeout(() => {
            // setVisibleMessage("");
            setFeedbackMessage("");
        }, 3000);
        return () => clearTimeout(timeout);

    }, [feedbackMessage]);

    return (
        <>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        checkGuess();
                    }
                }}
                placeholder={placeholder}
            />
            <button onClick={checkGuess}>Check woord</button>

            {/* ✅ Dynamische feedback styling met fade-out */}
            <div style={{
                minHeight: "40px", /* ✅ Reserveert ruimte */
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <p style={{
                    color: isCorrect ? "green" : "black",
                    transition: "opacity 0.5s ease-in-out",
                    opacity: feedbackMessage ? 1 : 0,
                    whiteSpace: "pre-line",
                    minHeight: "24px", /* ✅ Zorgt ervoor dat er altijd ruimte is */
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    {feedbackMessage || "‎"} {/* Onzichtbare spatie om ruimte te reserveren */}
                </p>
            </div>

        </>
    );
}

export default Input;
