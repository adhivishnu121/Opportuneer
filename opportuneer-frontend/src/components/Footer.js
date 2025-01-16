import React from 'react';
import './Footer.css';
import footerLogo from './footer_logo.png';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <div className="footer-container">
	   <Link to="/" ><img src={footerLogo} className="App-logo" alt="Opportuneer" /></Link>
            <div className="social-buttons">
                <p className="social-text"></p>
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/s-icons/facebook.png" alt="Facebook" className="social-icon" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="/s-icons/twitter.png" alt="Twitter" className="social-icon" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="/s-icons/linkedin.png" alt="LinkedIn" className="social-icon" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/s-icons/instagram.png" alt="Instagram" className="social-icon" />
                    </a>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Opportuneer. All rights reserved.</p>
                <div className="footer-links">
                    <a href="/privacy" className="footer-link">Privacy Policy</a>
                    <a href="/terms" className="footer-link">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
