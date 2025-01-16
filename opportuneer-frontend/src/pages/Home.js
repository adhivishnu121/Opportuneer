// src/pages/Home.js
import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import FAQ from './FAQ'; 


const Home = () => {
    const navigate = useNavigate();

    const handleRedirectEmp = () => {
        navigate('/employer'); 
    }; 
     const handleRedirectExp = () => {
        navigate('/explore'); 
    }; 
      return (
        <div className="home-container">
            <div className="explore-con">
                <h1 className="home-title">Wanna be an Opportuneer?</h1>
                <p className="home-description">
                    Discover part-time and sponsorship job opportunities that fit your lifestyle and career goals.
                </p>
                <button className="explore-button" onClick={handleRedirectExp}>Explore</button> {}
                       </div>
             
            <div className="postjob-con">
                <h1 className="home-title">Looking for an Opportuneer?</h1>
                <p className="home-description">
                    Discover proficient hands to strengthen your team. Post a job for free and connect with your next best hire! 
                </p>
                <button className="postjob-button" onClick={handleRedirectEmp}>POST A JOB</button> {}
                       </div>

<FAQ />
        </div>
    );
};

export default Home;
