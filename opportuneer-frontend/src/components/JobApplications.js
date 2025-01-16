import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./JobApplications.css";

const JobApplications = () => {
    const { jobId } = useParams(); 
    const [jobTitle, setJobTitle] = useState(""); 
    const [applications, setApplications] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [userDetails, setUserDetails] = useState({}); 

    
    const fetchUserDetails = (email) => {
        axios
            .get(`http://localhost:8080/api/user/details?email=${email}`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
                return null;
            });
    };

    useEffect(() => {
        
        fetch(`http://localhost:8080/api/jobs/${jobId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch job details");
                }
                return response.json();
            })
            .then((data) => {
                setJobTitle(data.title);
            })
            .catch((error) => {
                console.error("Error fetching job details:", error);
            });

    fetch(`http://localhost:8080/api/applications/${jobId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch applications");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched Applications:", data); 
            setApplications(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching applications:", error);
            setLoading(false);
        });
}, [jobId]);

    if (loading) {
        return <p>Loading applications...</p>;
    }

    if (applications.length === 0) {
        return <p>No applications found for this job.</p>;
    }

    return (
        <div className="jap">
            <h2>Applications for {jobTitle || "Unknown Title"}</h2>
            <ul>
    {applications.map((app, index) => (
        <li key={index}>
            <p>Name: {app.applicantName || "N/A"}</p>
            <p>Email: {app.applicantEmail}</p>
            {app.resumePath ? (
    <a
        href={`file:///C:/Users/Adhi%20Vishnu/Desktop/opportuneer-backend/${app.resumePath}`}
        target="_blank"
        rel="noopener noreferrer"
    >
        View Resume
    </a>
) : (
    <p>No resume uploaded</p>
)}

        </li>
    ))}
</ul>

        </div>
    );
};

export default JobApplications;
