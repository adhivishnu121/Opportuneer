package com.example.opportuneer_backend.service;

import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> searchJobs(String title, String location, String jobType, String jobSite, String sector) {
        title = (title == null || title.isEmpty()) ? "%" : title;
        location = (location == null || location.isEmpty()) ? "%" : location;
        jobType = (jobType == null || jobType.isEmpty()) ? "%" : jobType;
        jobSite = (jobSite == null || jobSite.isEmpty()) ? "%" : jobSite;
        sector = (sector == null || sector.isEmpty()) ? "%" : sector;

        return jobRepository.searchJobs(title, location, jobType, jobSite, sector);
    }

    public Page<Job> getAllJobs(Pageable pageable) {
        return jobRepository.findAll(pageable);
    }
    
    public Job saveJob(Job job) {
        return jobRepository.save(job); 
    }
    public List<Job> findJobsByCompany(String companyName) {
        return jobRepository.findByCompany(companyName);
    }
    public Optional<Job> findById(Long id) {
        return jobRepository.findById(id);
    }

}
