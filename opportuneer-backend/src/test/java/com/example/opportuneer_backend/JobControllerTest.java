package com.example.opportuneer_backend;

import com.example.opportuneer_backend.controller.JobController;
import com.example.opportuneer_backend.model.Job;
import com.example.opportuneer_backend.service.JobService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class JobControllerTest {

    @Mock
    private JobService jobService;

    @InjectMocks
    private JobController jobController;

    private MockMvc mockMvc;
    private Job mockJob;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(jobController).build();

        mockJob = new Job();
        mockJob.setId(1L);
        mockJob.setTitle("Software Engineer");
        mockJob.setLocation("London");
        mockJob.setJobType("Full-time");
        mockJob.setJobSite("Remote");
        mockJob.setSector("IT");
    }

    @Test
    void searchJobsTest() throws Exception {
        when(jobService.searchJobs(anyString(), anyString(), anyString(), anyString(), anyString()))
                .thenReturn(Arrays.asList(mockJob));

        mockMvc.perform(get("/api/jobs/search")
                .param("title", "Software Engineer")
                .param("location", "London"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(mockJob.getTitle()))
                .andExpect(jsonPath("$[0].location").value(mockJob.getLocation()));

        verify(jobService, times(1)).searchJobs(anyString(), anyString(), anyString(), anyString(), anyString());
    }

   

    
    @Test
    void getAllJobsTest() throws Exception {
        
        Page<Job> jobPage = new PageImpl<>(Arrays.asList(mockJob), PageRequest.of(0, 10), 1); 

        // Mock the service method to return a page
        when(jobService.getAllJobs(any(Pageable.class))).thenReturn(jobPage);

        
        mockMvc.perform(get("/api/jobs")
                .param("page", "0")
                .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(mockJob.getTitle()))
                .andExpect(jsonPath("$[0].location").value(mockJob.getLocation()));

        
        verify(jobService, times(1)).getAllJobs(any(Pageable.class));
    }


    @Test
    void postJobTest() throws Exception {
        when(jobService.saveJob(any(Job.class))).thenReturn(mockJob);

        mockMvc.perform(post("/api/jobs/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(mockJob)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value(mockJob.getTitle()))
                .andExpect(jsonPath("$.location").value(mockJob.getLocation()));

        verify(jobService, times(1)).saveJob(any(Job.class));
    }

    @Test
    void getJobsByCompanyTest() throws Exception {
        when(jobService.findJobsByCompany("TechCorp")).thenReturn(Arrays.asList(mockJob));

        mockMvc.perform(get("/api/jobs/by-company")
                .param("companyName", "TechCorp"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(mockJob.getTitle()));

        verify(jobService, times(1)).findJobsByCompany("TechCorp");
    }

    @Test
    void getJobByIdTest() throws Exception {
        when(jobService.findById(1L)).thenReturn(Optional.of(mockJob));

        mockMvc.perform(get("/api/jobs/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(mockJob.getTitle()))
                .andExpect(jsonPath("$.location").value(mockJob.getLocation()));

        verify(jobService, times(1)).findById(1L);
    }

    @Test
    void updateJobTest() throws Exception {
        when(jobService.findById(1L)).thenReturn(Optional.of(mockJob));
        when(jobService.saveJob(any(Job.class))).thenReturn(mockJob);

        mockJob.setTitle("Updated Software Engineer");

        mockMvc.perform(put("/api/jobs/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(mockJob)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Software Engineer"));

        verify(jobService, times(1)).saveJob(any(Job.class));
    }
}
