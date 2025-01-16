package com.example.opportuneer_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.opportuneer_backend.model.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    boolean existsByJobIdAndApplicantEmail(Long jobId, String applicantEmail);
    List<Application> findByJobId(Long jobId);

    List<Application> findByApplicantEmail(String applicantEmail);

}
