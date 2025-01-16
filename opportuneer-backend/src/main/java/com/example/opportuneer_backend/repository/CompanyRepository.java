package com.example.opportuneer_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.opportuneer_backend.model.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {
    Company findByEmail(String email);
}
