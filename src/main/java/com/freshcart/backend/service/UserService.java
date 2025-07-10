package com.freshcart.backend.service;

import com.freshcart.backend.entity.User;
import com.freshcart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service for user-related business logic.
 */
@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * Register a new user (with password hashing).
     */
    public User registerUser(User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User saved = userRepository.save(user);
            log.info("User registered in service: {}", user.getEmail());
            return saved;
        } catch (Exception e) {
            log.error("Error registering user in service: {}", e.getMessage());
            throw e;
        }
    }

    /**
     * Authenticate user by email/username and password.
     */
    public Optional<User> authenticate(String emailOrUsername, String rawPassword) {
        try {
            Optional<User> userOpt = userRepository.findByEmail(emailOrUsername);
            if (userOpt.isEmpty()) {
                userOpt = userRepository.findByUsername(emailOrUsername);
            }
            if (userOpt.isPresent() && passwordEncoder.matches(rawPassword, userOpt.get().getPassword())) {
                log.info("User authenticated in service: {}", emailOrUsername);
                return userOpt;
            }
            log.warn("Authentication failed in service for: {}", emailOrUsername);
            return Optional.empty();
        } catch (Exception e) {
            log.error("Error during authentication in service: {}", e.getMessage());
            throw e;
        }
    }

    /**
     * Find user by ID.
     */
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Find user by username.
     */
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Save user profile changes.
     */
    public User save(User user) {
        try {
            User saved = userRepository.save(user);
            log.info("User profile saved in service: {}", user.getEmail());
            return saved;
        } catch (Exception e) {
            log.error("Error saving user profile in service: {}", e.getMessage());
            throw e;
        }
    }

    /**
     * Check if the provided raw password matches the user's current password.
     */
    public boolean checkPassword(User user, String rawPassword) {
        return passwordEncoder.matches(rawPassword, user.getPassword());
    }

    /**
     * Update the user's password (hashes the new password).
     */
    public void updatePassword(User user, String newPassword) {
        try {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            log.info("User password updated in service: {}", user.getEmail());
        } catch (Exception e) {
            log.error("Error updating password in service: {}", e.getMessage());
            throw e;
        }
    }
} 