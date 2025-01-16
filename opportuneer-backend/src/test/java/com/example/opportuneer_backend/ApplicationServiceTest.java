package com.example.opportuneer_backend;

import com.example.opportuneer_backend.controller.ApplicationRequest;
import com.example.opportuneer_backend.model.Application;
import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.repository.ApplicationRepository;
import com.example.opportuneer_backend.repository.JobRepository;
import com.example.opportuneer_backend.service.ApplicationService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class ApplicationServiceTest {

    @Mock
    private ApplicationRepository applicationRepository;

    @Mock
    private JobRepository jobRepository;

    @InjectMocks
    private ApplicationService applicationService;

    private ApplicationRequest applicationRequest;
    private Application application;
    private Job job;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        
        applicationRequest = new ApplicationRequest();
        applicationRequest.setJobId(1L);
        applicationRequest.setApplicantEmail("johndoe@example.com");
        applicationRequest.setApplicantName("John Doe");
        applicationRequest.setResumePath("path/to/resume.pdf");

        
        application = new Application();
        application.setJobId(1L);
        application.setApplicantEmail("johndoe@example.com");
        application.setApplicantName("John Doe");
        application.setResumePath("path/to/resume.pdf");

        job = new Job();
        job.setId(1L);
        job.setTitle("Software Engineer");
        job.setDescription("A software engineering position.");
        job.setLocation("New York");
        job.setCompany("Tech Corp");
    }

    @Test
    void testSaveApplication() {
        
        when(applicationRepository.save(any(Application.class))).thenReturn(application);

        
        applicationService.saveApplication(applicationRequest);

        
        verify(applicationRepository, times(1)).save(any(Application.class));
    }

    @Test
    void testHasApplied() {
        
        when(applicationRepository.existsByJobIdAndApplicantEmail(1L, "johndoe@example.com")).thenReturn(true);

        
        boolean result = applicationService.hasApplied(1L, "johndoe@example.com");

        assertTrue(result);
        verify(applicationRepository, times(1)).existsByJobIdAndApplicantEmail(1L, "johndoe@example.com");
    }

    @Test
    void testGetAppliedJobsForUser() {
        
        when(applicationRepository.findByApplicantEmail("johndoe@example.com")).thenReturn(Arrays.asList(application));

        
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));

        
        List<Job> jobs = applicationService.getAppliedJobsForUser("johndoe@example.com");

        assertNotNull(jobs);
        assertEquals(1, jobs.size());
        assertEquals("Software Engineer", jobs.get(0).getTitle());
        verify(applicationRepository, times(1)).findByApplicantEmail("johndoe@example.com");
        verify(jobRepository, times(1)).findById(1L);
    }

    @Test
    void testGetApplicationsByJobId() {
        
        when(applicationRepository.findByJobId(1L)).thenReturn(Arrays.asList(application));

        
        List<Application> applicationsList = applicationService.getApplicationsByJobId(1L);

        assertNotNull(applicationsList);
        assertEquals(1, applicationsList.size());
        assertEquals("johndoe@example.com", applicationsList.get(0).getApplicantEmail());
        verify(applicationRepository, times(1)).findByJobId(1L);
    }
}
