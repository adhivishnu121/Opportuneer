import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [postcode, setPostcode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resume, setResume] = useState(null);  
const [popupMessage, setPopupMessage] = useState(''); 
    const [showPopup, setShowPopup] = useState(false); 
const [showConsentPopup, setShowConsentPopup] = useState(false); 
    const [dataConsent, setDataConsent] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
 if (!dataConsent) {
            alert("You must agree to the data consent terms.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('postcode', postcode);
        formData.append('password', password);
        formData.append('resume', resume);  

        try {
            const response = await fetch('http://localhost:8080/api/user/register', {
                method: 'POST',
                body: formData,
            });

           if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            setPopupMessage('Registration successful!');
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
                navigate('/login'); 
            }, 2000);
        } catch (error) {
            console.error('Error:', error);
            setPopupMessage(`Error: ${error.message}`);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <div className="rg-container">
         {showPopup && (
                <div className="ppopup-box">
                    <div className="popup-content">
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}
            
             {showConsentPopup && (
                <div className="popup-box">
                    <div className="popup-content">
                        <h3>Data Consent Policy</h3>
                        <p>
                            By registering with Opportuneer, you agree to the collection and use of your personal data
                            such as names, email addresses, and resumes. We prioritize your data privacy and security, adhering
                            to GDPR and related standards. Your data will only be used for job application purposes.
                        </p>
                        <button onClick={() => setShowConsentPopup(false)} className="popup-close">
                            Close
                        </button>
                    </div>
                </div>
            )}
            
            <div className="rgs-container">
                <h2>Join Opportuneer</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            placeholder="Postcode"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => setResume(e.target.files[0])} 
                            required
                        />
                    </div>
                    <div className="consent-group">
                        <input
                            type="checkbox"
                            id="dataConsent"
                            checked={dataConsent}
                            onChange={() => setDataConsent(!dataConsent)}
                        />
                        <label htmlFor="dataConsent">
                            I agree to the{' '}
                            <span
                                className="consent-link"
                                onClick={() => setShowConsentPopup(true)}
                            >
                                Data Consent Policy
                            </span>
                        </label>
                    </div>
                    <button type="submit" className="rg-button">Register</button>
                </form>
                <p className="footer-text">Already a User? <Link to="/login">Login Here</Link></p>
            </div>
        </div>
    );
};

export default Register;
