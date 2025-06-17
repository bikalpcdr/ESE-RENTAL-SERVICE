package com.bikalp.eserentalservice.service.impl;

import com.bikalp.eserentalservice.dto.UserDto;
import com.bikalp.eserentalservice.dto.auth.*;
import com.bikalp.eserentalservice.entity.User;
import com.bikalp.eserentalservice.enums.UserRole;
import com.bikalp.eserentalservice.exception.BadRequestException;
import com.bikalp.eserentalservice.exception.ResourceNotFoundException;
import com.bikalp.eserentalservice.repository.UserRepo;
import com.bikalp.eserentalservice.service.AuthService;
import com.bikalp.eserentalservice.service.UserService;
import com.bikalp.eserentalservice.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private static final int OTP_LENGTH = 6;
    private static final int OTP_VALIDITY_MINUTES = 10;

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

    @Override
    @Transactional
    public ForgetPasswordResponse forgotPassword(ForgotPasswordRequest request) {
        log.info("Processing forgot password request for identifier: {}", request.getIdentifier());
        
        User user = userRepo.findByUsernameOrEmail(request.getIdentifier(), request.getIdentifier())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with provided identifier"));

        // Generate OTP
        String otp = generateOTP();
        LocalDateTime otpExpiry = LocalDateTime.now().plusMinutes(OTP_VALIDITY_MINUTES);

        // Save OTP and expiry
        user.setResetToken(otp);
        user.setResetTokenExpiry(otpExpiry);
        userRepo.save(user);

        // Send OTP email
        try {
            emailService.sendPasswordResetOTP(user.getEmail(), otp);
            log.info("OTP sent successfully to user: {}", user.getUsername());
        } catch (Exception e) {
            log.error("Failed to send OTP email to user: {}", user.getUsername(), e);
            throw new BadRequestException("Failed to send OTP. Please try again later.");
        }

        ForgetPasswordResponse response = new ForgetPasswordResponse();
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setMessage("OTP has been sent to your email");

        return response;
    }

    @Override
    @Transactional
    public VerifyOTPResponse verifyOTP(VerifyOTPRequest request) {
        log.info("Verifying OTP for user");

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getResetToken() == null || user.getResetTokenExpiry() == null) {
            throw new BadRequestException("No OTP request found. Please request a new OTP.");
        }

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("OTP has expired. Please request a new OTP.");
        }

        if (!user.getResetToken().equals(request.getOtp())) {
            throw new BadRequestException("Invalid OTP. Please try again.");
        }

        // Generate a temporary token for password reset
        String resetToken = generateResetToken();
        user.setResetToken(resetToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(OTP_VALIDITY_MINUTES));
        userRepo.save(user);

        VerifyOTPResponse response = new VerifyOTPResponse();
        response.setMessage("OTP verified successfully");
        response.setResetToken(resetToken);
        return response;
    }

    @Override
    @Transactional
    public ResetPasswordResponse resetPassword(ResetPasswordRequest request) {
        log.info("Processing password reset request");

        User user = userRepo.findByResetToken(request.getToken())
                .orElseThrow(() -> new BadRequestException("Invalid reset token"));

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Reset token has expired. Please request a new OTP.");
        }

        // Update password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepo.save(user);

        log.info("Password reset successful for user: {}", user.getUsername());

        return ResetPasswordResponse.builder()
                .message("Password reset successful")
                .username(user.getUsername())
                .build();
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
        // default role for user..!!
        userDto.setRole(UserRole.CUSTOMER);
        return userDto;
    }

    private String generateToken(UserDto userDto) {
        try {
            log.debug("Generating token for user: {}", userDto.getUsername());
            
            // Validate userDto
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

    private String generateOTP() {
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    private String generateResetToken() {
        return UUID.randomUUID().toString();
    }

    @Override
    public void logout() {
        log.info("Logging out user");
        SecurityContextHolder.clearContext(); // Clear the security context
    }
} 