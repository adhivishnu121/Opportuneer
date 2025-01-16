// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './logo.svg';
import axios from 'axios';
import PostJob from "./PostJob"; 
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer'; 
import Employer from './pages/Employer';
import EmpLogin from './pages/EmpLogin';
import EmpRegister from './pages/EmpRegister';
import Explore from './pages/Explore';
import Jsdash from './/Jsdash';
import EditProfile from './pages/EditProfile';
import { UserProvider, useUser } from './pages/UserContext'; 
import Logout from './pages/Logout'; 
import Search from './components/Search'; 
import Empdash from './/Empdash';
import JobDetails from "./components/JobDetails";
import EditableJobDetails from './components/EditableJobDetails';
import JobApplications from "./components/JobApplications";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";

function App() {
    const location = useLocation(); 
    const [isSidebarOpen, setSidebarOpen] = useState(false); 
	    const { userEmail,firstName,setFirstName, lastName, setLastName } = useUser(); 


const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
      const closeSidebar = () => {
        setSidebarOpen(false);
    };
    useEffect(() => {
        if (userEmail) {
            axios
                .get(`http://localhost:8080/api/user/details?email=${userEmail}`)
                .then((response) => {
                    setLastName(response.data.lastName); 
					setFirstName(response.data.firstName); 

                })
                .catch((error) => {
                    console.error('Error fetching user details:', error);
                });
        }
    }, [userEmail,setFirstName, setLastName]);
    
    
    return (
        <div className="App">
            <header className="App-header">
               <Link to="/" ><img src={logo} className="App-logo" alt="Opportuneer" /></Link>
                     <div className="button-group">
         {location.pathname === '/' && (
            <>
                <Link to="/register" className="rgbutton">Join Us</Link>
                <Link to="/login" className="lgbutton">Log In</Link>
            </>
)}
    {location.pathname === '/login' && (
          <Link to="/register" className="rgbutton">Join Us</Link>
        )}
        {location.pathname === '/register' && (
          <Link to="/login" className="lgbutton">Log In</Link>
        )}
        {location.pathname === '/emp-login' && (
          <Link to="/emp-register" className="rgbutton">Join Us</Link>
        )}
        {location.pathname === '/emp-register' && (
          <Link to="/emp-login" className="lgbutton">Log In</Link>
        )}
        {location.pathname === '/search' && (
	          <Link to="/jsdash" className="dashbutton">&#127891;{firstName}</Link>
	     )}
	     {location.pathname === '/empdash' && (
          <Link to="/post-job" className="pjbutton">➕Post Job</Link>
        )}
{['/jsdash', '/edit-profile','/search'].includes(location.pathname) && (
    <button className="profile-button" onClick={toggleSidebar}>
        <span className="hamburger-icon">&#9776;</span>
    </button>
)}
</div>
 


            </header>
            <main className="App-main">
                <Routes>
                 <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
				<Route path="/employer" element={<Employer />} />
				<Route path="/emp-login" element={<EmpLogin />} />
				<Route path="/emp-register" element={<EmpRegister />} />
				<Route path="/explore" element={<Explore/>} />
				<Route path="/jsdash" element={<Jsdash />} />
				<Route path="/empdash" element={<Empdash />} />
				<Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/logout" element={<Logout />} /> 
				<Route path="/search" element={<Search />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/jobs/:id" element={<JobDetails />} /> 
				<Route path="/employer/job-details/:jobId" element={<EditableJobDetails />} />
                <Route path="/employer/job-applications/:jobId" element={<JobApplications />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                </Routes>
            </main>
              {isSidebarOpen && (
                <div className="sidebar">
                    <button className="close-button" onClick={closeSidebar}>&times;</button>
                    <h2>{lastName}</h2> 
                    <ul>
                        <li ><Link to="/edit-profile" onClick={closeSidebar} >Edit Profile</Link></li>
                        <li><Link to="/jsdash" onClick={closeSidebar} >View Applications</Link></li>
                        <li><Link to="/logout" onClick={closeSidebar}>Logout</Link></li> 
                    </ul>
                </div>
            )}

                            <Footer /> 

        </div>
    );
}

const AppWrapper = () => (
    <UserProvider>  
        <Router>
            <App />
        </Router>
    </UserProvider>
);

export default AppWrapper;
