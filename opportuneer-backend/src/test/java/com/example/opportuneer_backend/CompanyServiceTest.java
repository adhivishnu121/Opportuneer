package com.example.opportuneer_backend;

import com.example.opportuneer_backend.model.Company;
import com.example.opportuneer_backend.repository.CompanyRepository;
import com.example.opportuneer_backend.service.CompanyService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private CompanyService companyService;

    @Test
    void saveCompanyTest() {
        Company company = new Company();
        company.setEmail("test@company.com");
        company.setPassword("password123");

        when(passwordEncoder.encode(company.getPassword())).thenReturn("hashedPassword");
        when(companyRepository.save(company)).thenReturn(company);

        Company savedCompany = companyService.saveCompany(company);

        assertEquals("test@company.com", savedCompany.getEmail());
        assertEquals("hashedPassword", savedCompany.getPassword());
        verify(companyRepository, times(1)).save(company);
    }

    @Test
    void findByEmailTest() {
        String email = "test@company.com";
        Company company = new Company();
        company.setEmail(email);

        when(companyRepository.findByEmail(email)).thenReturn(company);

        Company foundCompany = companyService.findByEmail(email);

        assertNotNull(foundCompany);
        assertEquals(email, foundCompany.getEmail());
    }

    @Test
    void checkPasswordTest() {
        Company company = new Company();
        company.setPassword("hashedPassword");

        when(passwordEncoder.matches("password123", company.getPassword())).thenReturn(true);

        boolean isPasswordCorrect = companyService.checkPassword(company, "password123");

        assertTrue(isPasswordCorrect);
    }
}
