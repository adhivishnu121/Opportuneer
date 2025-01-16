import React, { useEffect, useState } from 'react';
import './Jsdash.css'; 
import axios from 'axios';
import { useUser } from './pages/UserContext';
import JobsDisplay from './components/JobsDisplay';

function JobSeekerDashboard() {
    const { userEmail, firstName, setFirstName } = useUser(); 
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingSavedJobs, setLoadingSavedJobs] = useState(true);
    const [activeSection, setActiveSection] = useState(null); 

    useEffect(() => {
        if (userEmail) {
            
            axios
                .get(`http://localhost:8080/api/user/details?email=${userEmail}`)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    return axios.get(`http://localhost:8080/api/applications/applied-jobs?email=${userEmail}`);
                })
                .then((response) => {
                    setAppliedJobs(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user or applied jobs:', error);
                    setLoading(false);
                });

            axios
                .get(`http://localhost:8080/api/saved-jobs/get?email=${userEmail}`)
                .then((response) => {
                    setSavedJobs(response.data);
                    setLoadingSavedJobs(false);
                })
                .catch((error) => {
                    console.error('Error fetching saved jobs:', error);
                    setLoadingSavedJobs(false);
                });
        }
    }, [userEmail, setFirstName]);

    
    const isJobSaved = (jobId) => savedJobs.some((job) => job.jobId === jobId);

    
    const toggleSection = (sectionId) => {
        setActiveSection(activeSection === sectionId ? null : sectionId);
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>{firstName || 'Opportuneer'}'s Dashboard</h1>
            </header>
            <div className="sections-row">
                {}
                <div
                    className={`section-card ${activeSection === 'applied' ? 'active' : ''}`}
                    onClick={() => toggleSection('applied')}
                >
                    <h2>Applied Jobs</h2>
                </div>
                <div
                    className={`section-card ${activeSection === 'saved' ? 'active' : ''}`}
                    onClick={() => toggleSection('saved')}
                >
                    <h2>Saved Jobs</h2>
                </div>
                
            </div>

            {}
            {activeSection === 'applied' && (
                <div className="section-content">
                    <h3>Applied Jobs</h3>
                    {loading ? (
                        <p>Loading applied jobs...</p>
                    ) : appliedJobs.length > 0 ? (
                        <JobsDisplay jobs={appliedJobs} />
                    ) : (
                        <p>No applied jobs found.</p>
                    )}
                </div>
            )}
            {activeSection === 'saved' && (
                <div className="section-content">
                    <h3>Saved Jobs</h3>
                    {loadingSavedJobs ? (
                        <p>Loading saved jobs...</p>
                    ) : savedJobs.length > 0 ? (
                        <JobsDisplay jobs={savedJobs} />
                    ) : (
                        <p>No saved jobs found.</p>
                    )}
                </div>
            )}
            
        </div>
    );
}

export default JobSeekerDashboard;
