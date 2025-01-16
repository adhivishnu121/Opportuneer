package com.example.opportuneer_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.opportuneer_backend.model.Application;
import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping("/apply")
    public ResponseEntity<String> applyForJob(@RequestBody ApplicationRequest applicationRequest) {
        
        boolean hasApplied = applicationService.hasApplied(applicationRequest.getJobId(), applicationRequest.getApplicantEmail());

        if (hasApplied) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You have already applied for this job.");
        }

        
        applicationService.saveApplication(applicationRequest);
        
        

        return ResponseEntity.ok("Application submitted successfully!");
    }


    @GetMapping("/check")
    public ResponseEntity<Boolean> hasApplied(
            @RequestParam Long jobId,
            @RequestParam String applicantEmail) {
        boolean hasApplied = applicationService.hasApplied(jobId, applicantEmail);
        return ResponseEntity.ok(hasApplied);
    }
    @GetMapping("/applied-jobs")
    public ResponseEntity<List<Job>> getAppliedJobs(@RequestParam String email) {
        
        List<Job> appliedJobs = applicationService.getAppliedJobsForUser(email);

        if (appliedJobs.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }

        return ResponseEntity.ok(appliedJobs);
    }
    @GetMapping("/{jobId}")
    public ResponseEntity<List<Application>> getApplicationsByJobId(@PathVariable Long jobId) {
        List<Application> applications = applicationService.getApplicationsByJobId(jobId);
        if (applications.isEmpty()) {
            return ResponseEntity.noContent().build(); 
        }
        applications.forEach(application -> System.out.println("Applicant Name: " + application.getApplicantName()));

        return ResponseEntity.ok(applications);
    }

}
