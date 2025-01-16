package com.example.opportuneer_backend;

import com.example.opportuneer_backend.model.User;
import com.example.opportuneer_backend.repository.UserRepository;
import com.example.opportuneer_backend.service.UserService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setEmail("john.doe@example.com");
        user.setPassword("password123");
    }

    @Test
    void saveUserTest() {
        
        String hashedPassword = "hashedPassword123";
        when(passwordEncoder.encode(user.getPassword())).thenReturn(hashedPassword);  

        
        userService.saveUser(user);

        
        assertEquals(hashedPassword, user.getPassword());
        verify(userRepository, times(1)).save(user);  
    }

    @Test
    void findByEmailTest() {
        
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);  

        
        User foundUser = userService.findByEmail(user.getEmail());

        
        assertNotNull(foundUser);
        assertEquals(user.getEmail(), foundUser.getEmail());  
        verify(userRepository, times(1)).findByEmail(user.getEmail());  
    }

    @Test
    void getResumePathByEmailTest_UserExists() {
        
        user.setResumePath("/uploads/resumes/resume123.pdf");  
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);  

        
        String resumePath = userService.getResumePathByEmail(user.getEmail());

        
        assertNotNull(resumePath);
        assertEquals("/uploads/resumes/resume123.pdf", resumePath);  
    }

    @Test
    void getResumePathByEmailTest_UserNotFound() {
        
        when(userRepository.findByEmail(user.getEmail())).thenReturn(null);  

        
        String resumePath = userService.getResumePathByEmail(user.getEmail());

        
        assertNull(resumePath);  
    }
}
