// src/pages/Login.js

import React, { useState } from 'react';
import './Login.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useUser } from "./UserContext";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const { setUserEmail } = useUser(); 
 const [popupMessage, setPopupMessage] = useState(''); 
    const [showPopup, setShowPopup] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            
            if (response.ok) {
                
                setPopupMessage('Login successful!');
                setShowPopup(true); 
                setUserEmail(email); 
                setTimeout(() => {
                    setShowPopup(false);
                    navigate('/search'); 
                }, 2000); 
            } else {
                
                const errorData = await response.json();
                setPopupMessage(`Error: ${errorData.message || 'Login failed'}`);
                setShowPopup(true); 
                setTimeout(() => setShowPopup(false), 3000); 
            }
        } catch (error) {
            console.error('Error:', error);
            setPopupMessage('An error occurred. Please try again.');
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <div className="lg-container">{showPopup && (
                <div className="kpopup-box">
                    <div className="popup-content">
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}
            <div className="lgn-container">
                <h2>Login to Opportuneer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter Username / Email" 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            value={password}
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="lg-button">Login</button>
                </form>
                <p className="footer-text">Don't have an account? <Link to="/register">Register Here</Link></p>
            </div>
        </div>
    );
};

export default Login;
