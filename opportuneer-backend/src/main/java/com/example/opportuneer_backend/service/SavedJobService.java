package com.example.opportuneer_backend.service;

import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.model.SavedJob;
import com.example.opportuneer_backend.repository.JobRepository;
import com.example.opportuneer_backend.repository.SavedJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SavedJobService {

    @Autowired
    private SavedJobRepository savedJobRepository;

    @Autowired
    private JobRepository jobRepository;

    public void saveJob(String email, Long jobId) {
        SavedJob savedJob = new SavedJob();
        
        savedJob.setUserEmail(email);  
        savedJob.setJobId(jobId);
        savedJobRepository.save(savedJob);
    }



    public List<Job> getSavedJobs(String userEmail) {
        List<SavedJob> savedJobs = savedJobRepository.findByUserEmail(userEmail);
        return savedJobs.stream()
                .map(savedJob -> jobRepository.findById(savedJob.getJobId()).orElse(null))
                .filter(job -> job != null)
                .collect(Collectors.toList());
    }
}
