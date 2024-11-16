import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DifficultySelection.css';

const DifficultySelection = () => {
    const navigate = useNavigate();

    const selectDifficulty = (level) => {
        navigate(`/game?difficulty=${level}`);
    };

    return (
        <div className="difficulty-container">
            <h1 className="difficulty-title">Select Difficulty</h1>
            <div className="button-group">
                <button className="difficulty-button" onClick={() => selectDifficulty('easy')}>Easy</button>
                <button className="difficulty-button" onClick={() => selectDifficulty('medium')}>Medium</button>
                <button className="difficulty-button" onClick={() => selectDifficulty('hard')}>Hard</button>
            </div>
        </div>
    );
};

export default DifficultySelection;
