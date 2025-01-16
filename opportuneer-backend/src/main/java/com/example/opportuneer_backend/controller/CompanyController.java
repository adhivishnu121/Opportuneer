package com.example.opportuneer_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.opportuneer_backend.model.Company;
import com.example.opportuneer_backend.service.CompanyService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("/api/emp")

public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping("/emp-register")
    public ResponseEntity<?> registerCompany(@RequestBody Company company) {
        if (companyService.findByEmail(company.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use");
        }
        
        companyService.saveCompany(company);
        return ResponseEntity.ok("Registration successful");
    }
    
@PostMapping("/emp-login") 
	public ResponseEntity<?> loginCompany(@RequestBody LoginRequest loginRequest) { 
		Company company = companyService.findByEmail(loginRequest.getEmail()); 
		if (company == null || !companyService.checkPassword(company, loginRequest.getPassword())) { 
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password"); 
				} 
		return ResponseEntity.ok("Login successful");
		}

@GetMapping("/emp-details")
public ResponseEntity<?> getCompanyDetails(@RequestParam String email) {
    Company company = companyService.findByEmail(email);
    if (company != null) {
        System.out.println("Retrieved company: " + company); 
        return ResponseEntity.ok(company);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Company not found");
    }
}

    
}
