import React, { useState } from 'react';
import './EmpLogin.css'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { useUser } from "./UserContext";

const EmpLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const { setEmpEmail } = useUser(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/emp/emp-login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert('Login successful!');
                				  setEmpEmail(email); 

                navigate('/empdash'); 
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Login failed'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="emplg-container">
        
            <div className="lgn-container">
                <h2>Employer Login</h2>
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
                    <button type="submit" className="lgn-button">Login</button>
                </form>
                <p className="footer-text">Don't have an account? <Link to="/emp-register">Register Here</Link></p>
            </div>
        </div>
    );
};

export default EmpLogin;
