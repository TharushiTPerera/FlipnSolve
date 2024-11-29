import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './game.css';

const images = [
    '/images/image1.png', '/images/image2.png', '/images/image3.png', '/images/image4.png', '/images/image5.png', '/images/image6.png',
    '/images/image1.png', '/images/image2.png', '/images/image3.png', '/images/image4.png', '/images/image5.png', '/images/image6.png'
];

const levels = {
    easy: { time: 40, points: 10 },
    medium: { time: 35, points: 20 },
    hard: { time: 10, points: 30 },
};

const FlipCardGame = () => {
    const [time, setTime] = useState(0);
    const [hearts, setHearts] = useState(2); // Start each level with 2 hearts
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [score, setScore] = useState(0);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const difficulty = queryParams.get('difficulty') || localStorage.getItem('currentDifficulty') || 'easy';

    // Shuffle function
    const shuffle = useCallback((array) => {
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, []);

    // Save game state before Banana game
    const saveGameState = useCallback(() => {
        localStorage.setItem('currentDifficulty', difficulty);
        localStorage.setItem('time', time);
        localStorage.setItem('matchedCards', JSON.stringify(matchedCards));
        localStorage.setItem('score', score);
    }, [difficulty, time, matchedCards, score]);

    // Initialize game state on load or resume
    useEffect(() => {
        const savedMatchedCards = JSON.parse(localStorage.getItem('matchedCards')) || [];
        const savedScore = localStorage.getItem('score');

        setTime(levels[difficulty]?.time || 40); // Set time for the current level
        setMatchedCards(savedMatchedCards);
        setScore(parseInt(savedScore, 10) || 0);

        const shuffledCards = shuffle(images);
        setCards(shuffledCards);
        setFlippedCards([]);
    }, [difficulty, shuffle]);

    // Handle flipping a card
    const flipCard = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index)) return;

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCard, secondCard] = newFlippedCards;
            if (cards[firstCard] === cards[secondCard]) {
                setMatchedCards((prev) => [...prev, cards[firstCard]]);
                setScore((prevScore) => prevScore + levels[difficulty].points); // Update score
                setFlippedCards([]);
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    // Handle losing a heart
    const handleHeartLoss = useCallback(() => {
        if (hearts > 1) {
            setHearts(hearts - 1);
            setCards(shuffle(images));
            setFlippedCards([]);
            setMatchedCards([]);
            setTime(levels[difficulty]?.time); // Reset timer for the current level
        } else {
            saveGameState(); // Save the game state before Banana game
            localStorage.setItem('bananaGameResult', 'pending');
            window.location.href = "/banana-game.html";
        }
    }, [hearts, difficulty, shuffle, saveGameState]);

    // Resume game after Banana game
    useEffect(() => {
        const bananaGameResult = localStorage.getItem('bananaGameResult');
        if (bananaGameResult === 'success') {
            setHearts(1); // Reset hearts to 1 after Banana game
            setCards(shuffle(images)); // Shuffle cards
            setFlippedCards([]);
            setMatchedCards(JSON.parse(localStorage.getItem('matchedCards')) || []); // Restore matched cards
            setTime(levels[difficulty]?.time); // Reset timer for the current level
            setScore(parseInt(localStorage.getItem('score'), 10) || 0); // Restore score
            localStorage.removeItem('bananaGameResult');
        }
    }, [difficulty, shuffle]);

    // Timer logic
    useEffect(() => {
        if (time === 0) return;
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleHeartLoss();
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [time, handleHeartLoss]);

    return (
        <div className="game-container">
            <div className="timer">Time: {time}s</div>
            <div className="hearts">❤️ {hearts}</div>
            <div className="score">Score: {score}</div>
            <div className="card-grid">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`card ${flippedCards.includes(index) || matchedCards.includes(card) ? 'flipped' : ''}`}
                        onClick={() => flipCard(index)}
                    >
                        <div className="card-front"></div>
                        <div className="card-back">
                            <img src={card} alt="card" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlipCardGame;
