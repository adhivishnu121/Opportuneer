import React from 'react';
import './Explore.css'; 
import { Link,  } from 'react-router-dom'; 
import logo from './logo.svg'; 

const Explore = () => {
    return (
        <div className="explore-page">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="Opportuneer" />
                <div className="button-group">
                    <Link to="/register" className="rgbutton">Join Us</Link>
                    <Link to="/login" className="lgbutton">Login</Link>
                </div>
            </header>

            <div className="explore-container">
                <h1 className="explore-title">Explore Job Opportunities</h1>
                <p className="explore-description">
                    Discover exciting job opportunities tailored just for you! Whether you’re looking to start your career, switch paths, or find remote work, we’ve got you covered.
                </p>

                <div className="steps-container">
                    <h2 className="steps-title">How to Get Started</h2>
                    <ul className="steps-list">
                        <li className="steps-item">
                            <h3>Create Your Profile</h3> Sign up and build a detailed profile that showcases your skills, experiences, and interests.
                        </li>
                        <li className="steps-item">
                            <h3>Browse Available Jobs</h3> Explore our extensive job listings tailored to your preferences and location.
                        </li>
                        <li className="steps-item">
                            <h3>Apply and Connect</h3> Submit your applications easily and connect with potential employers for interviews.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Explore;
