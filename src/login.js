import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const loginData = {
            username: username,
            password: password
        };

        // Send POST request to backend for login
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            setMessage("Login successful!");
            navigate('/home'); // Redirect to the home page
        } else {
            setMessage("Invalid username or password");
        }
    };

    return (
        <div className="container">
            <h1 className="title">Flip 'n' Solve</h1>
            <div className="register-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email"><img src="user.png" alt="email icon" />Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="Enter your username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password"><img src="padlock.png" alt="password icon" />Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            placeholder="Enter your password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="submit-btn">Enter</button>
                    </div>
                </form>
                {message && <div className="message">{message}</div>} {/* Display response message */}
            </div>
        </div>
    );
};

export default Login;
