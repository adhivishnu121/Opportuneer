package com.example.opportuneer_backend;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	 @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
            .authorizeRequests()
            .requestMatchers("/api/saved-jobs/**").permitAll()
            .requestMatchers("/api/user/**").permitAll()
            .requestMatchers("/api/emp/**").permitAll()
            .requestMatchers("/api/jobs/**").permitAll()
            .requestMatchers("/api/applications/**").permitAll()
            .requestMatchers("/files/**").permitAll()

            .anyRequest().authenticated();
        return http.build();
    }
}
