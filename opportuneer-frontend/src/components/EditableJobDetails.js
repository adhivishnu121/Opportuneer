import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './JobDetails.css';
import "./EditableJobDetails.css";
function EditableJobDetails() {
    const { jobId } = useParams(); 
    const navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        
        fetch(`http://localhost:8080/api/jobs/${jobId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                return response.json();
            })
            .then((data) => {
                setJobDetails(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching job details:', error);
                setLoading(false);
            });
    }, [jobId]);

    const handleSave = () => {
        
        if (!jobDetails.title || !jobDetails.location || !jobDetails.jobType) {
            setError('Please fill in all required fields');
            return;
        }
        setSaving(true);
        fetch(`http://localhost:8080/api/jobs/${jobId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jobDetails), 
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to save job details');
                }
                alert('Job details updated successfully!');
                setSaving(false);
            })
            .catch((error) => {
                console.error('Error saving job details:', error);
                alert('Failed to update job details.');
                setSaving(false);
            });
    };

    const handleViewApplications = () => {
        navigate(`/employer/job-applications/${jobId}`); 
    };

    if (loading) {
        return <p>Loading job details...</p>;
    }

    return (
        <div className="job-details-container">
            <h2>Edit Job Details</h2>
            {error && <p className="error-message">{error}</p>}
            {jobDetails && (
                <form>
                    <label>
                        Job Title:
                        <input
                            type="text"
                            value={jobDetails.title}
                            onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
                        />
                    </label>
                    <label>
                        Location:
                        <input
                            type="text"
                            value={jobDetails.location}
                            onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
                        />
                    </label>
                    <label>
                        Job Type:
                        <input
                            type="text"
                            value={jobDetails.jobType}
                            onChange={(e) => setJobDetails({ ...jobDetails, jobType: e.target.value })}
                        />
                    </label>
                    <label>
                        Salary:
                        <input
                            type="text"
                            value={jobDetails.salary || ''}
                            onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })}
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={jobDetails.description || ''}
                            onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })}
                        />               
                    </label>
                    <button type="button" onClick={handleSave} disabled={saving}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={handleViewApplications}>
                        View Applications
                    </button>
                </form>
            )}
        </div>
    );
}

export default EditableJobDetails;
