package com.example.opportuneer_backend.controller;

import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class JobController {

    @Autowired
    private JobService jobService;

    @GetMapping("/search")
    public ResponseEntity<List<Job>> searchJobs(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(required = false) String jobSite,
            @RequestParam(required = false) String sector
    ) {
      
        List<Job> jobs = jobService.searchJobs(title, location, jobType, jobSite, sector);
        
        return ResponseEntity.ok(jobs);
    }

    @GetMapping
    public ResponseEntity<List<Job>> getAllJobs(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "10") int size) {
        Page<Job> jobs = jobService.getAllJobs(PageRequest.of(page, size));
        return ResponseEntity.ok(jobs.getContent());
    }
    
    @PostMapping("/post")
    public ResponseEntity<?> postJob(@RequestBody Job job) {
        try {
            
            if (job.getApplicationMethod() == null || job.getApplicationMethod().trim().isEmpty()) {
                job.setApplicationMethod("application"); 
            }

            
            if (!job.getApplicationMethod().equalsIgnoreCase("application") &&
                !job.getApplicationMethod().equalsIgnoreCase("external")) {
                return ResponseEntity.badRequest().body("Invalid application method.");
            }

            
            Job savedJob = jobService.saveJob(job);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error posting job: " + e.getMessage());
        }
    }





    @GetMapping("/by-company")
    public ResponseEntity<?> getJobsByCompany(@RequestParam String companyName) {
        List<Job> jobs = jobService.findJobsByCompany(companyName);
        if (jobs.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No jobs found for the company");
        }
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {
        Optional<Job> job = jobService.findById(id); 
        if (job.isPresent()) {
            return ResponseEntity.ok(job.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable Long id, @RequestBody Job updatedJobDetails) {
        Optional<Job> optionalJob = jobService.findById(id);
        if (optionalJob.isPresent()) {
            Job existingJob = optionalJob.get();
            existingJob.setTitle(updatedJobDetails.getTitle());
            existingJob.setLocation(updatedJobDetails.getLocation());
            existingJob.setJobType(updatedJobDetails.getJobType());
            existingJob.setJobSite(updatedJobDetails.getJobSite());
            existingJob.setSector(updatedJobDetails.getSector());
            existingJob.setSalary(updatedJobDetails.getSalary());
            existingJob.setDescription(updatedJobDetails.getDescription());
            Job savedJob = jobService.saveJob(existingJob);
            return ResponseEntity.ok(savedJob);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Job not found");
        }
    }

}
