package com.example.opportuneer_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.opportuneer_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByEmail(String email);
}
