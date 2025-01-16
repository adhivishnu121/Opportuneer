import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../pages/UserContext";
import "./JobDetails.css";

function JobDetails() {
    const { id } = useParams(); 
    const { userEmail, firstName, lastName } = useUser(); 
    const [job, setJob] = useState(null);
    const [isApplied, setIsApplied] = useState(false); 
    const [loading, setLoading] = useState(true);
    const [resumePath, setResumePath] = useState(""); 
    const [savedJobs, setSavedJobs] = useState([]); 

    const name = `${firstName} ${lastName}`; 

    useEffect(() => {
        
        axios
            .get(`http://localhost:8080/api/jobs/${id}`)
            .then((response) => {
                setJob(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching job details:", error);
                setLoading(false);
            });

        if (userEmail) {
            
            axios
                .get(`http://localhost:8080/api/user/resume?email=${userEmail}`)
                .then((response) => {
                    setResumePath(response.data.resumePath); 
                })
                .catch((error) => {
                    console.error("Error fetching resume path:", error);
                });

            
            axios
                .get(`http://localhost:8080/api/applications/check?jobId=${id}&applicantEmail=${userEmail}`)
                .then((response) => {
                    setIsApplied(response.data); 
                })
                .catch((error) => console.error("Error checking application status:", error));
        }
    }, [id, userEmail]);

    const applyForJob = async () => {
        if (!userEmail) {
            alert("Please log in to apply for this job.");
            return;
        }

        if (!resumePath) {
            alert("Please upload your resume before applying."+{userEmail});
            return;
        }

        try {
            const jobTitle = job.title; 

            await axios.post(`http://localhost:8080/api/applications/apply`, {
                jobId: job.id,
                applicantEmail: userEmail,
                applicantName: name,
                jobTitle: jobTitle,
                resumePath: resumePath, 
            });

            setIsApplied(true); 
            alert("Application submitted successfully!");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data); 
            } else {
                console.error("Error applying for the job:", error);
                alert("Failed to apply for the job. Please try again.");
            }
        }
    };

    const onSaveJob = (jobId) => {
        if (savedJobs.includes(jobId)) {
            alert("This job is already saved.");
            return;
        }

        axios
            .post("http://localhost:8080/api/saved-jobs/save", null, {
                params: { email: userEmail, jobId: jobId },
            })
            .then(() => {
                alert("Job saved successfully!");
                setSavedJobs((prevSavedJobs) => [...prevSavedJobs, jobId]); 
            })
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data); 
                } else {
                    console.error("Error saving job:", error);
                    alert("Failed to save job.");
                }
            });
    };

    if (loading) {
        return <p>Loading job details...</p>;
    }

    if (!job) {
        return <p>Job not found.</p>;
    }

    return (
        <div className="job-details">
            <h1>{job.title}</h1>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Onsite/Remote:</strong> {job.jobSite}</p>
            <p><strong>Sector:</strong> {job.sector}</p>
            <p><strong>Salary:</strong> {job.salary ? `£${job.salary.toLocaleString()}` : "Not specified"}</p>
            <h3>Description:</h3>
            <div
                className="job-description"
                dangerouslySetInnerHTML={{ __html: job.description }}
            />
            <div className="job-actions">
                {}
                {}
{job.applicationMethod === "application" ? (
    <button
        onClick={applyForJob}
        disabled={isApplied}
    >
        {isApplied ? "Applied" : "Apply"}
    </button>
) : (
    <a href={job.externalURL} target="_blank" rel="noopener noreferrer">
        <button>Apply on Company Website</button>
    </a>
)}


                {}
                <button
                    onClick={() => onSaveJob(job.id)} 
                    disabled={savedJobs.includes(job.id)}
                >
                    {savedJobs.includes(job.id) ? "Saved" : "Save Job"}
                </button>
            </div>
        </div>
    );
}

export default JobDetails;
