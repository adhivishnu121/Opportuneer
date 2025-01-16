import React from "react";
import { Link } from "react-router-dom";
import "./JobsDisplay.css"; 

const JobsDisplay = ({ jobs, onSaveJob }) => {
    if (!jobs) {
        return <p>Loading jobs...</p>;
    }

    if (!jobs.length) {
        return <p>No jobs found. Please adjust your search or try again.</p>;
    }

    return (
        <div className="job-results">

            {jobs.map((job, index) => (
                <div key={index} className="job-card">
                    <Link to={`/jobs/${job.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <h3>{job.title}</h3>
                        <div className="job-details-grid">
                            <p><strong>&#x1f3e2;-</strong> {job.company}</p>
                            <p><strong>&#128205;-</strong> {job.location}</p>
                            <p><strong>&#129520;-</strong> {job.jobType}</p>
                            <p><strong>🧑‍💻-</strong> {job.jobSite}</p>
                            <p><strong>&#128119;-</strong> {job.sector}</p>
                            <p><strong>&#128176;-</strong> {job.salary ? `£${job.salary.toLocaleString()}` : "Not Specified"}</p>
                        	<p>
                                <strong>Sponsorship:</strong>{" "}
                                 <span
                                    style={{
                                        color: job.sponsorshipAvailable ? "green" : "red",
                                        fontWeight: "bold",
                                    }}
                                >
                                {job.sponsorshipAvailable ? "Available" : "Not Available"}
                           </span>
                            </p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default JobsDisplay;
