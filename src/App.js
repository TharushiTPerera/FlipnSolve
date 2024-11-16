import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Register from './register';
import HomePage from './home';
import LeaderBoard from './leaderboard';
import DifficultySelection from './DifficultySelection';
import Game from './Game';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/DifficultySelection" element={<DifficultySelection />} />
                <Route path="/game" element={<Game />} />  
                <Route path="/leaderboard" element={<LeaderBoard />} /> {/* New route */}
            </Routes>
        </Router>
    );
};

export default App;
