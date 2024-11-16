import './home.css';

function HomePage() {
    const handleLogout = () => {
        // Clear any user session data, like tokens stored in localStorage or sessionStorage
        localStorage.removeItem('authToken');  // Example if you're storing an auth token
        window.location.href = '/login';  // Redirect to login page
    };

    return (
        <div className="homepage">
            <h1 className="homepage-title">Flip 'n' Solve</h1>
            <div className="homepage-container">
                <div className="button-group">
                    <button className="button" onClick={() => window.location.href = '/DifficultySelection'}>Play</button>
                    <button className="button" onClick={() => window.location.href = '/leaderboard'}>Score</button>
                    <button className="button" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
