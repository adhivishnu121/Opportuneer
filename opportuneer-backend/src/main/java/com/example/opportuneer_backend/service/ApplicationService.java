package com.example.opportuneer_backend.service;

import com.example.opportuneer_backend.controller.ApplicationRequest;
import com.example.opportuneer_backend.model.Application;
import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.repository.ApplicationRepository;
import com.example.opportuneer_backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository; 

    public void saveApplication(ApplicationRequest request) {
        Application application = new Application();
        application.setJobId(request.getJobId());
        application.setApplicantEmail(request.getApplicantEmail());
        application.setApplicantName(request.getApplicantName());
application.setResumePath(request.getResumePath());
        applicationRepository.save(application);
    }

    
    public boolean hasApplied(Long jobId, String applicantEmail) {
        return applicationRepository.existsByJobIdAndApplicantEmail(jobId, applicantEmail);
    }

    
    public List<Job> getAppliedJobsForUser(String email) {
        
        List<Application> applications = applicationRepository.findByApplicantEmail(email);

        
        return applications.stream()
                .map(application -> jobRepository.findById(application.getJobId())
                    .orElse(new Job()))  
                .collect(Collectors.toList());
    }
    
    
    public List<Application> getApplicationsByJobId(Long jobId) {
        List<Application> applications = applicationRepository.findByJobId(jobId);
        return applications.stream()
                .map(app -> new Application(app.getApplicantEmail(), app.getResumePath(), app.getApplicantName()))
                .collect(Collectors.toList());
    }

}
