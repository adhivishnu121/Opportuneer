package com.example.opportuneer_backend.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.opportuneer_backend.model.User;
import com.example.opportuneer_backend.repository.UserRepository;
import com.example.opportuneer_backend.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    
    @PostMapping("/register")
    public ResponseEntity<?> register(
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName,
        @RequestParam("email") String email,
        @RequestParam("phoneNumber") String phoneNumber,
        @RequestParam("postcode") String postcode,
        @RequestParam("password") String password,
        @RequestParam("resume") MultipartFile resume) {
        try {
            
            String resumeFileName = System.currentTimeMillis() + "_" + resume.getOriginalFilename();
            Path path = Paths.get("uploads/resumes/" + resumeFileName);
            Files.createDirectories(path.getParent());  
            resume.transferTo(path);  
            User user = new User();
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setEmail(email);
            user.setPhoneNumber(phoneNumber);
            user.setPostcode(postcode);
            user.setPassword(password);  
            user.setResumePath(path.toString());  

            userService.saveUser(user);

            return ResponseEntity.ok("Registration successful!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("message", "Error saving resume"));
        }
    }

    @PostMapping("/login")

	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		User user = userService.findByEmail(loginRequest.getEmail());
		if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
			return ResponseEntity.ok("Login successful!");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("message", "Invalid credentials"));
		}
	}

    
    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails(@RequestParam String email) {
        User user = userService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/resume")
    public ResponseEntity<Map<String, String>> getUserResumePath(@RequestParam String email) {
        User user = userRepository.findByEmail(email);
        
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("message", "User not found"));
        }
        
        Map<String, String> response = new HashMap<>();
        response.put("resumePath", user.getResumePath()); 
        System.out.println("resumepath"+user.getResumePath());
        return ResponseEntity.ok(response);
    }
    
    @PutMapping("/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody User updatedUser) {
        User existingUser = userService.findByEmail(updatedUser.getEmail());
        if (existingUser != null) {
            
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
            existingUser.setPostcode(updatedUser.getPostcode());

            
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            userService.saveUser(existingUser);
            return ResponseEntity.ok("Profile updated successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    
}
