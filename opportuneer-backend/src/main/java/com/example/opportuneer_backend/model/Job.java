package com.example.opportuneer_backend.model;

import jakarta.persistence.*;

@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String company;
    private String location;
    private String jobType; 
    private String jobSite; 
    private String sector; 
    private Double salary; 

    // Getters and Setters
    @Column(length = 2000)
    private String description; 
    @Column(name = "application_method", nullable = false)
    private String applicationMethod; 

    private String externalURL; 
    @Column(name = "sponsorship_available")
    private Boolean sponsorshipAvailable;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getJobSite() {
        return jobSite;
    }

    public void setJobSite(String jobSite) {
        this.jobSite = jobSite;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }
    public String getApplicationMethod() {
        return applicationMethod;
    }

    public void setApplicationMethod(String applicationMethod) {
        this.applicationMethod = applicationMethod;
    }
    
	public String getExternalURL() {
		return externalURL;
	}

	public void setExternalURL(String externalURL) {
		this.externalURL = externalURL;
	}
	 public Boolean getSponsorshipAvailable() {
	        return sponsorshipAvailable;
	    }

	    public void setSponsorshipAvailable(Boolean sponsorshipAvailable) {
	        this.sponsorshipAvailable = sponsorshipAvailable;
	    }
}
