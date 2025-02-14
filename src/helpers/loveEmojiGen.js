import {useEffect, useState} from "react";

const loveEmojis = ["😻", "😘", "💕", "💓", "💘"];

function createFloatingEmoji() {
    const emoji = document.createElement("div");
    emoji.innerText = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
    emoji.classList.add("love-emoji");

    // Willekeurige positie binnen de hero container
    emoji.style.left = Math.random() * 80 + "%";
    emoji.style.top = Math.random() * 80 + "%";

    document.querySelector(".hero").appendChild(emoji);

    setTimeout(() => {
        emoji.remove();
    }, 3000); // Na 3 seconden verwijderen
}

export default createFloatingEmoji;
