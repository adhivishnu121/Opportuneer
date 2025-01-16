// src/pages/EmpRegister.js
import React, { useState } from 'react';
import './EmpRegister.css'; 
import { Link, useNavigate } from 'react-router-dom';

const EmpRegister = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
      const [location, setLocation] = useState('');

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/emp/emp-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ companyName, email, website, description, industry,location,password, }),
            });

            if (response.ok) {
                
                alert('Registration successful!');
                navigate('/dashboard'); 
            } else {
                
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Registration failed'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="emp-rg-container">
            <div className="emprgs-container">
                <h2>Employer Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            id="companyName"
                            value={companyName}
                            placeholder="Enter Company Name"
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            placeholder="Enter Company Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                   
                    <div className="input-group">
                        <input
                            type="text"
                            id="website"
                            value={website}
                            placeholder="Enter Company Website"
                            onChange={(e) => setWebsite(e.target.value)}
                            required
                        />
                    </div>
                      <div className="input-group">
                        <input
                            type="text"
                            id="description"
                            value={description}
                            placeholder="Describe your Company"
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
      <div className="input-group">
    <select
        id="industry"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        required
    >
        <option value="" disabled>
            Select Industry Type
        </option>
       <option value="">Select</option>
                        {[
                            "Accountancy, Banking and Finance", "Business, Consulting and Management", "Charity and Voluntary Work", 
							"Consulting", "Creative Arts and Design", "Design", "Education", "Engineering", "Engineering and Manufacturing", 
							"Environment and Agriculture", "Energy and Utilities", "Finance", "Health Care Provider", "Healthcare", 
							"Hospitality and Events Management", "Information Technology", "Law", "Law Enforcement and Security", 
							"Leisure, Sport and Tourism", "Management", "Manufacturing", "Marketing, Advertising and PR", "Media and Internet", 
							"Property and Construction", "Public Services and Administration", "Recruitment and HR", "Research", "Retail", 
							"Sales", "Science and Pharmaceuticals", "Social Care", "Teacher Training and Education", "Transport and Logistics", 
							"Other"

                        ].map((sector) => (
                            <option key={sector} value={sector}>{sector}</option>
                        ))}
                    </select>
</div>

<div className="input-group">
                        <input
                            type="text"
                            id="location"
                            value={location}
                            placeholder="Enter Company Location"
                            onChange={(e) => setLocation(e.target.value)}
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
                    <div className="input-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="emprgs-button">Register</button>
                </form>
                <p className="footer-text">Already have an account? <Link to="/emp-login">Login Here</Link></p>
            </div>
        </div>
    );
};

export default EmpRegister;
