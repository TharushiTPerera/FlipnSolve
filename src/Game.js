import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './game.css';

// Assuming images are placed in the public/images folder
const images = [
    '/images/image1.png', '/images/image2.png', '/images/image3.png', '/images/image4.png', '/images/image5.png', '/images/image6.png',
    '/images/image1.png', '/images/image2.png', '/images/image3.png', '/images/image4.png', '/images/image5.png', '/images/image6.png'
];

// Define level properties
const levels = {
    easy: { time: 40, points: 10 },
    medium: { time: 35, points: 20 },
    hard: { time: 25, points: 30 },
};

const FlipCardGame = () => {
    const [time, setTime] = useState(0);
    const [hearts, setHearts] = useState(2);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const difficulty = queryParams.get('difficulty'); 

    // Set the timer based on the selected difficulty
    useEffect(() => {
        setTime(levels[difficulty]?.time || 40);
    }, [difficulty]);

    // Shuffle images and set up the cards
    useEffect(() => {
        const shuffledCards = shuffle(images);
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setGameOver(false);
    }, []);  

    // Shuffle function to randomize the card order
    const shuffle = (array) => {
        let shuffled = array.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Handle card flipping logic
    const flipCard = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index)) return;

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstCard, secondCard] = newFlippedCards;
            if (cards[firstCard] === cards[secondCard]) {
                setMatchedCards((prev) => [...prev, cards[firstCard]]);
                setFlippedCards([]);
                checkAllCardsMatched();
            } else {
                setTimeout(() => setFlippedCards([]), 1000);
            }
        }
    };

    // Check if all cards are matched to complete a round
    const checkAllCardsMatched = () => {
        if (matchedCards.length + 1 === cards.length / 2) {
            completeRound();
        }
    };

    // Complete the current round: update score, shuffle cards, and reset timer
    const completeRound = () => {
        const points = levels[difficulty]?.points || 0;
        setScore((prevScore) => prevScore + points);

        // Reset game state for a new round
        setCards(shuffle(images));
        setFlippedCards([]);
        setMatchedCards([]);
        setTime(levels[difficulty].time);
    };

    // Handle heart loss
    const handleHeartLoss = useCallback(() => {
        if (hearts > 1) {
            setHearts(hearts - 1);
            setCards(shuffle(images)); // Reset cards for a new round
            setFlippedCards([]);
            setMatchedCards([]);
            setTime(levels[difficulty].time); // Reset the time for next round
        } else {
            setGameOver(true);
            // Redirect to Banana Game if out of hearts
            window.location.href = "/banana-game.html";
        }
    }, [hearts, difficulty]);

    // Check for Banana Game result on load
    useEffect(() => {
        const bananaGameResult = localStorage.getItem('bananaGameResult');
        if (bananaGameResult === 'success') {
            setHearts((prevHearts) => prevHearts + 1);
            localStorage.removeItem('bananaGameResult');
        }
    }, []);

    // Start a timer and handle time end
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
            {gameOver && <div className="game-over">Game Over</div>}
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
            {gameOver && (
                <button onClick={() => window.location.reload()} className="restart-button">
                    Restart Game
                </button>
            )}
        </div>
    );
};

export default FlipCardGame;
