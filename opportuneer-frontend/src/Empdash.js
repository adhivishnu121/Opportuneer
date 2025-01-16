import React, { useEffect, useState } from 'react';
import './Empdash.css';
import { useUser } from './pages/UserContext';
import { useNavigate } from 'react-router-dom';

function EmployerDashboard() {
    const { empEmail, setCompanyName, companyName } = useUser();
    const [postedJobs, setPostedJobs] = useState([]);
    const [loadingPostedJobs, setLoadingPostedJobs] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (empEmail) {
            
            fetch(`http://localhost:8080/api/emp/emp-details?email=${empEmail}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch company details');
                    }
                    return response.json();
                })
                .then((data) => {
                    setCompanyName(data.companyName); 
                    return fetch(`http://localhost:8080/api/jobs/by-company?companyName=${data.companyName}`);
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch posted jobs');
                    }
                    return response.json();
                })
                .then((jobs) => {
                    setPostedJobs(jobs); 
                    setLoadingPostedJobs(false);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                    setLoadingPostedJobs(false);
                });
        }
    }, [empEmail, setCompanyName]);

    const handleEditJob = (jobId) => {
        navigate(`/employer/job-details/${jobId}`); 
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>{companyName || 'Your Company'}'s Dashboard</h1>
            </header>
            <div className="sections-row">
                <div className="section-card active">
                    <h2>Posted Jobs</h2>
                </div>
            </div>

            <div className="section-content">
                {loadingPostedJobs ? (
                    <p>Loading posted jobs...</p>
                ) : postedJobs.length > 0 ? (
                    <div className="job-list">
                        {postedJobs.map((job) => (
                            <div key={job.id} className="job-card" onClick={() => handleEditJob(job.id)}>
                                <h3>{job.title}</h3>
                                <div className="job-details-grid">
                            <p><strong>&#x1f3e2;-</strong> {job.company}</p>
                            <p><strong>&#128205;-</strong> {job.location}</p>
                            <p><strong>&#129520;-</strong> {job.jobType}</p>
                            <p><strong>🧑‍💻-</strong> {job.jobSite}</p>
                            <p><strong>&#128119;-</strong> {job.sector}</p>
                            <p><strong>&#128176;-</strong> {job.salary ? `£${job.salary.toLocaleString()}` : "Not Specified"}</p>
                        </div>    
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No jobs posted yet.</p>
                )}
            </div>
        </div>
    );
}

export default EmployerDashboard;
