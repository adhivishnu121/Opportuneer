import React, { useState } from "react";
import "./Search.css";
import JobsDisplay from "./JobsDisplay";
import axios from "axios";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    
    const [filters, setFilters] = useState({
        location: "",
        jobType: "",
        jobSite: "",
        jobSector: "", 
        titleOptions: [
            "Software Engineer", "Graduate Software Engineer", "Cloud Engineer", 
            "Full Stack Engineer", "Java Software Engineer", "Junior Software Engineer", 
            "Information Technology Engineer", "Frontend Developer", "System Engineer", 
            "Embedded Software Engineer", "Back End Developer"
        ]
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/jobs/search', {
                params: {
                title: searchQuery ||filters.title || null,  
                location: filters.location || null,
                jobType: filters.jobType || null,
                jobSite: filters.jobSite || null,
                sector: filters.jobSector || null
            }
            });
  console.log('Fetched Jobs:', response.data);  
            setJobs(response.data);  
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setLoading(false);
        }
    };
    
    const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFilters((prevFilters) => ({
        ...prevFilters,
        title: value,  
    }));
};

    return (
        <div className="search-page">
            <h1>Let's get Started...!</h1>
            <div className="search-bar">
                <input
    type="text"
    placeholder="Search for opportunities..."
    value={searchQuery}
    onChange={handleSearchInputChange}
/>

                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="filters">
                <div className="filter-item">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g., London"
                        value={filters.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="filter-item">
                    <label>Job Type:</label>
                    <select
                        name="jobType"
                        value={filters.jobType}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                
                <div className="filter-item">
                    <label>Onsite/Remote:</label>
                    <select
                        name="jobSite"
                        value={filters.jobSite}
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
                        <option value="OnSite">OnSite</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>
                
                <div className="filter-item">
                    <label>Job Sector:</label>
                    <select
                        name="jobSector"
                        value={filters.jobSector} 
                        onChange={handleInputChange}
                    >
                        <option value="">Select</option>
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
                </div>
                
                <div className="filter-item">
                    <label>Job Title:</label>
                    <select
                        name="title"
                        value={filters.title}
                        onChange={(e) => handleInputChange(e)}
                    >
                        <option value="">Select</option>
                        {filters.titleOptions.map((title) => (
                            <option key={title} value={title}>{title}</option>
                        ))}
                    </select>
                </div>
            </div>
           <div className="jobs">            <h1>Search results...</h1>
 {loading ? <p>Loading...</p> : <JobsDisplay jobs={jobs} />}
        </div>        </div>                
                     


    );
};

export default Search;
