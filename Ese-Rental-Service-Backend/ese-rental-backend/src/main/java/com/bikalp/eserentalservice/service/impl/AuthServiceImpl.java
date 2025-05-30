package com.bikalp.eserentalservice.service.impl;

import com.bikalp.eserentalservice.dto.UserDto;
import com.bikalp.eserentalservice.dto.auth.AuthResponse;
import com.bikalp.eserentalservice.dto.auth.LoginRequest;
import com.bikalp.eserentalservice.dto.auth.RegisterRequest;
import com.bikalp.eserentalservice.entity.User;
import com.bikalp.eserentalservice.enums.UserRole;
import com.bikalp.eserentalservice.exception.BadRequestException;
import com.bikalp.eserentalservice.service.AuthService;
import com.bikalp.eserentalservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        try {
            log.info("Processing registration request for user: {}", request.getUsername());
            
            // Validate request
            validateRegistrationRequest(request);

            // Create user DTO
            UserDto userDto = createUserDto(request);
            log.debug("Created user DTO: {}", userDto);

            // Save user
            UserDto savedUser = userService.createUser(userDto);
            log.info("User registered successfully: {}", savedUser.getUsername());

            // Generate token
            String token = generateToken(savedUser);
            log.debug("Generated token for user: {}", savedUser.getUsername());

            return AuthResponse.builder()
                    .token(token)
                    .username(savedUser.getUsername())
                    .email(savedUser.getEmail())
                    .fullName(savedUser.getFullName())
                    .role(savedUser.getRole().name())
                    .build();
        } catch (Exception e) {
            log.error("Error during user registration: {}", e.getMessage(), e);
            throw new BadRequestException("Registration failed: " + e.getMessage());
        }
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        try {
            log.info("Processing login request for user: {}", request.getUsername());
            
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()
                )
            );
            log.debug("User authenticated successfully: {}", request.getUsername());

            // Get user details
            UserDto userDto = userService.getUserByUsername(request.getUsername());
            log.debug("Retrieved user details for: {}", request.getUsername());

            // Generate token
            String token = generateToken(userDto);
            log.info("User logged in successfully: {}", request.getUsername());

            return AuthResponse.builder()
                    .token(token)
                    .username(userDto.getUsername())
                    .email(userDto.getEmail())
                    .fullName(userDto.getFullName())
                    .role(userDto.getRole().name())
                    .build();
        } catch (BadCredentialsException e) {
            log.error("Authentication failed for user: {}", request.getUsername());
            throw new BadRequestException("Invalid username or password");
        } catch (Exception e) {
            log.error("Error during login: {}", e.getMessage(), e);
            throw new BadRequestException("Login failed: " + e.getMessage());
        }
    }

    private void validateRegistrationRequest(RegisterRequest request) {
        log.debug("Validating registration request for user: {}", request.getUsername());
        if (userService.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username already exists");
        }
        if (userService.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists");
        }
    }

    private UserDto createUserDto(RegisterRequest request) {
        log.debug("Creating user DTO from request for user: {}", request.getUsername());
        UserDto userDto = new UserDto();
        userDto.setUsername(request.getUsername());
        userDto.setPassword(request.getPassword());
        userDto.setEmail(request.getEmail());
        userDto.setFullName(request.getFullName());
        userDto.setPhoneNumber(request.getPhoneNumber());
        userDto.setRole(UserRole.CUSTOMER); // Default role
        return userDto;
    }

    private String generateToken(UserDto userDto) {
        try {
            log.debug("Generating token for user: {}", userDto.getUsername());
            
            // Validate userDto
            if (userDto == null) {
                throw new IllegalArgumentException("UserDto cannot be null");
            }
            if (userDto.getUsername() == null || userDto.getUsername().trim().isEmpty()) {
                throw new IllegalArgumentException("Username cannot be null or empty");
            }
            if (userDto.getPassword() == null || userDto.getPassword().trim().isEmpty()) {
                throw new IllegalArgumentException("Password cannot be null or empty");
            }
            if (userDto.getRole() == null) {
                throw new IllegalArgumentException("User role cannot be null");
            }

            // Create authorities
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + userDto.getRole().name())
            );
            
            // Create UserDetails object
            UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                userDto.getUsername().trim(),
                userDto.getPassword().trim(),
                true, // enabled
                true, // accountNonExpired
                true, // credentialsNonExpired
                true, // accountNonLocked
                authorities
            );
            
            // Generate token
            String token = jwtService.generateToken(userDetails);
            log.debug("Token generated successfully for user: {}", userDto.getUsername());
            return token;
        } catch (Exception e) {
            log.error("Error generating token for user {}: {}", userDto.getUsername(), e.getMessage(), e);
            throw new BadRequestException("Token generation failed: " + e.getMessage());
        }
    }
} 