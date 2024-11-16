import React, { useEffect, useState } from 'react';
import './leaderboard.css';

function LeaderBoard() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await fetch('http://localhost:8080/scoreboard');
                const data = await response.json();
                setPlayers(data);
            } catch (error) {
                console.error("Error fetching players:", error);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">LeaderBoard</h1>
            <div className="leaderboard-list">
                {players.map((player, index) => (
                    <div key={index} className="leaderboard-item">
                        <div className="rank">{index + 1}</div>
                        <div className="name">{player.username}</div>
                        <div className="score">{player.score}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LeaderBoard;
