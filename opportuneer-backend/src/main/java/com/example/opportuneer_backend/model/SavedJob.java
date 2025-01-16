package com.example.opportuneer_backend.model;

import jakarta.persistence.*;

@Entity
public class SavedJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail;

    private Long jobId;

    public SavedJob() {}

    public SavedJob(String userEmail, Long jobId) {
        this.userEmail = userEmail;
        this.jobId = jobId;
    }

    public Long getId() {
        return id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }
}
