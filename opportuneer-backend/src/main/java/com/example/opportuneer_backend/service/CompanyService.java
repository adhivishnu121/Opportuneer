package com.example.opportuneer_backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.opportuneer_backend.model.Company;
import com.example.opportuneer_backend.repository.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Company saveCompany(Company company) {
        company.setPassword(passwordEncoder.encode(company.getPassword())); 
        return companyRepository.save(company);
    }

    public Company findByEmail(String email) {
        return companyRepository.findByEmail(email);
    }
    
    public boolean checkPassword(Company company, String password) { 
    	return passwordEncoder.matches(password, company.getPassword()); 
    	}
    
}
