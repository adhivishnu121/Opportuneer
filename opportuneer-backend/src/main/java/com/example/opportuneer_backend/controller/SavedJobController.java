package com.example.opportuneer_backend.controller;

import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.service.SavedJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = "http://localhost:3000")
public class SavedJobController {

    @Autowired
    private SavedJobService savedJobService;

    @PostMapping("/save")
    public ResponseEntity<String> saveJob(@RequestParam String email, @RequestParam Long jobId) {
      try {  savedJobService.saveJob(email, jobId);
        return ResponseEntity.ok("Job saved successfully!");
    } catch (DataIntegrityViolationException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("This job is already saved.");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while saving the job.");
    }}

    @GetMapping("/get")
    public ResponseEntity<List<Job>> getSavedJobs(@RequestParam String email) {
        List<Job> savedJobs = savedJobService.getSavedJobs(email);
        if (savedJobs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(savedJobs);
    }
}
