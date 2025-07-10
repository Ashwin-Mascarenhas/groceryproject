package com.freshcart.backend.controller;

import com.freshcart.backend.entity.User;
import com.freshcart.backend.security.JwtUtils;
import com.freshcart.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * REST controller for user registration, login, and profile management.
 */
@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * Register a new user.
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user) {
        try {
            userService.registerUser(user);
            log.info("User registered: {}", user.getEmail());
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
        } catch (Exception e) {
            log.error("Error registering user: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }

    /**
     * User login endpoint.
     */
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User loginRequest) {
        try {
            return userService.authenticate(loginRequest.getEmail(), loginRequest.getPassword())
                    .map(user -> {
                        String token = jwtUtils.generateToken(user);
                        log.info("User logged in: {}", loginRequest.getEmail());
                        return ResponseEntity.ok(token);
                    })
                    .orElseGet(() -> {
                        log.warn("Invalid login attempt for: {}", loginRequest.getEmail());
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                    });
        } catch (Exception e) {
            log.error("Error during login: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed");
        }
    }

    /**
     * Get user profile (secured endpoint).
     */
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            return userService.findByUsername(username)
                    .map(user -> {
                        log.info("Profile fetched for user: {}", username);
                        return ResponseEntity.ok(user);
                    })
                    .orElseGet(() -> {
                        log.warn("Profile not found for user: {}", username);
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                    });
        } catch (Exception e) {
            log.error("Error fetching profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Update user profile (authenticated user).
     */
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@Valid @RequestBody User updatedUser) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            return userService.findByUsername(username)
                    .map(user -> {
                        user.setFirstName(updatedUser.getFirstName());
                        user.setLastName(updatedUser.getLastName());
                        user.setPhoneNumber(updatedUser.getPhoneNumber());
                        user.setAddressLine1(updatedUser.getAddressLine1());
                        user.setAddressLine2(updatedUser.getAddressLine2());
                        user.setCity(updatedUser.getCity());
                        user.setState(updatedUser.getState());
                        user.setPostalCode(updatedUser.getPostalCode());
                        user.setCountry(updatedUser.getCountry());
                        User saved = userService.save(user);
                        log.info("Profile updated for user: {}", username);
                        return ResponseEntity.ok(saved);
                    })
                    .orElseGet(() -> {
                        log.warn("Profile update failed, user not found: {}", username);
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                    });
        } catch (Exception e) {
            log.error("Error updating profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Change user password (authenticated user).
     */
    public static class PasswordChangeRequest {
        public String oldPassword;
        public String newPassword;
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/change-password")
    public ResponseEntity<String> changePassword(@Valid @RequestBody PasswordChangeRequest req) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            return userService.findByUsername(username)
                    .map(user -> {
                        if (!userService.checkPassword(user, req.oldPassword)) {
                            log.warn("Password change failed for user {}: old password incorrect", username);
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Old password is incorrect");
                        }
                        userService.updatePassword(user, req.newPassword);
                        log.info("Password changed for user: {}", username);
                        return ResponseEntity.ok("Password changed successfully");
                    })
                    .orElseGet(() -> {
                        log.warn("Password change failed, user not found: {}", username);
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                    });
        } catch (Exception e) {
            log.error("Error changing password: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Password change failed");
        }
    }
} 