// src/pages/Employer.js
import React from 'react';
import './Employer.css';
import logo from './logo.svg'; 
import { Link,  } from 'react-router-dom'; 

const Employer = () => {
    return (
        <div className="employer-page">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="Opportuneer" />
                <div className="button-group">
                    <Link to="/emp-register" className="rgbutton">Join Us</Link>
                    <Link to="/emp-login" className="lgbutton">Login</Link>
                </div>
            </header>
            <div className="employer-container">
                <h1 className="employer-title">Welcome, Employer!</h1>
                <p className="employer-description">
                    Find the best candidates by posting your job openings.
                </p>
                <div className="steps-container">
                    <h2 className="steps-title">Three Steps for Hiring:</h2>

                    <div className="step step-one">
                        <h3>Create an Account</h3>
                        <p>Sign up with your company’s details to access our hiring platform. You can manage job posts and candidates from a single dashboard.</p>
                    </div>

                    <div className="step step-two">
                        <h3>Post a Job</h3>
                        <p>Provide job details, including skills, location, and duration, to attract the most qualified Opportuneers. Posting is simple and free!</p>
                    </div>

                    <div className="step step-three">
                        <h3>Pick the Best Opportuneers</h3>
                        <p>Review applications, shortlist top candidates, and schedule interviews to find the perfect fit for your team.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Employer;
