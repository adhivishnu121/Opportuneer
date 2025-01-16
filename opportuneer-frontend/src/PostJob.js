import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./PostJob.css"; 
import { useUser } from './pages/UserContext'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

function PostJob() {
    const { empEmail, setCompanyName, companyName } = useUser();

    const [jobDetails, setJobDetails] = useState({
        title: "",
        company: "",
        location: "",
        jobType: "",
        jobSite: "",
        sector: "",
        salary: "",
        description: "",
        applicationMethod: "application", 
        externalURL: "", 
    sponsorshipAvailable: "no", 

    });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
    }));
};

    
    const handleQuillChange = (value) => {
        setJobDetails((prevDetails) => ({
            ...prevDetails,
            description: value, 
        }));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Job Details Payload:", jobDetails);

    const jobData = { ...jobDetails, company: companyName };

    console.log("Submitting job data:", jobData); 

    try {
        const response = await axios.post("http://localhost:8080/api/jobs/post", jobData);
        alert("Job posted successfully!");
        setJobDetails({
            title: "",
            company: "",
            location: "",
            jobType: "",
            jobSite: "",
            sector: "",
            salary: "",
            description: "",
            applicationMethod: "application", 
            externalURL: "", 
            sponsorshipAvailable: "no", 

        });
    } catch (error) {
        console.error("Error posting job:", error);
        alert(`Failed to post job. Error: ${error.response?.data || error.message}`);

    }
};
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
                })
                .catch((error) => {
                    console.error('Error fetching company details:', error);
                });
        }
    }, [empEmail, setCompanyName]);

    return (
        <div className="post-job">
            <h1>Post a Job</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Job Title:
                    <input
                        type="text"
                        name="title"
                        value={jobDetails.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Company:
                    <input
                        type="text"
                        name="company"
                        value={companyName} 
                        readOnly
                    />
                </label>
                <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={jobDetails.location}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Job Type:
                    <select name="jobType" value={jobDetails.jobType} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </label>
                <label>
                    Onsite/Remote:
                    <select name="jobSite" value={jobDetails.jobSite} onChange={handleChange} required>
                        <option value="">Select</option>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </label>
                <label>
                    Sector:
                    <select name="sector" value={jobDetails.sector} onChange={handleChange} required>
                        <option value="" disabled>Choose Sector</option>
                        {[
                            "Accountancy, Banking and Finance", "Business, Consulting and Management", "Charity and Voluntary Work", 
                            "Consulting", "Creative Arts and Design", "Design", "Education", "Engineering", "Engineering and Manufacturing", 
                            "Environment and Agriculture", "Energy and Utilities", "Finance", "Health Care Provider", "Healthcare", 
                            "Hospitality and Events Management", "Information Technology", "Law", "Law Enforcement and Security", 
                            "Leisure, Sport and Tourism", "Management", "Manufacturing", "Marketing, Advertising and PR", "Media and Internet", 
                            "Property and Construction", "Public Services and Administration", "Recruitment and HR", "Research", "Retail", 
                            "Sales", "Science and Pharmaceuticals", "Social Care", "Teacher Training and Education", "Transport and Logistics", 
                            "Other"
                        ].map((sector) => (
                            <option key={sector} value={sector}>{sector}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={jobDetails.salary}
                        onChange={handleChange}
                    />
                </label><div>
                <label>Description:</label>
                <ReactQuill value={jobDetails.description} onChange={handleQuillChange} />
                </div><label>
                    Application Method:
                    <select
                        name="applicationMethod"
                        value={jobDetails.applicationMethod}
                        onChange={handleChange}
                        required
                    >
                        <option value="application">Apply on Platform</option>
                        <option value="external">Redirect to External Website</option>
                    </select>
                </label>
               {jobDetails.applicationMethod === "external" && (
    <label>
        External URL:
        <input
            type="url"
            name="externalURL"
            value={jobDetails.externalURL}
            onChange={handleChange}
            placeholder="Enter the external application link"
            required
        />
    </label>
)}
<label>
    Sponsorship Available:
    <div className="sponsorship-container">
        <label className="sponsorship-option">
            <input
                type="radio"
                name="sponsorshipAvailable"
                value="true"
                checked={jobDetails.sponsorshipAvailable === true}
                onChange={() =>
                    setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        sponsorshipAvailable: true,
                    }))
                }
            />
            Yes
        </label>
        <label className="sponsorship-option">
            <input
                type="radio"
                name="sponsorshipAvailable"
                value="false"
                checked={jobDetails.sponsorshipAvailable === false}
                onChange={() =>
                    setJobDetails((prevDetails) => ({
                        ...prevDetails,
                        sponsorshipAvailable: false,
                    }))
                }
            />
            No
        </label>
    </div>
</label>



                <button type="submit">Post Job</button>
            </form>
        </div>
    );
}

export default PostJob;
