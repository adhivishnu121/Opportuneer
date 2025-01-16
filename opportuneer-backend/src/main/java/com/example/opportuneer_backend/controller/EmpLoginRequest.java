package com.example.opportuneer_backend.controller;

public class EmpLoginRequest {
	 private String email;
	    private String password;
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}

	}