package com.example.opportuneer_backend.repository;

import com.example.opportuneer_backend.model.SavedJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByUserEmail(String userEmail);
    
}
