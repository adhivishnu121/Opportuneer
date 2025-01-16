package com.example.opportuneer_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.opportuneer_backend.model.User;
import com.example.opportuneer_backend.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void saveUser(User user) {
        
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        userRepository.save(user);
    }
    public User findByEmail(String email) { 
    	return userRepository.findByEmail(email); }

    public String getResumePathByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            return user.getResumePath(); 
        }
        return null; 
    }

}
