package com.bikalp.eserentalservice.controller;

import com.bikalp.eserentalservice.controller.basecontroller.BaseController;
import com.bikalp.eserentalservice.dto.GlobalAPIResponse;
import com.bikalp.eserentalservice.dto.auth.*;
import com.bikalp.eserentalservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController extends BaseController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<GlobalAPIResponse> register(@Valid @RequestBody RegisterRequest request) {
        return createdResponse("User registered successfully", authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<GlobalAPIResponse> login(@Valid @RequestBody LoginRequest request) {
        return successResponse("Login successful", authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<GlobalAPIResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return successResponse("Password reset instructions sent", authService.forgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<GlobalAPIResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return successResponse("Password reset successful", authService.resetPassword(request));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<GlobalAPIResponse> verifyOTP(@Valid @RequestBody VerifyOTPRequest request) {
        return successResponse("OTP verified successfully", authService.verifyOTP(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<GlobalAPIResponse> logout() {
        authService.logout();
        return noContentResponse("Logged out successfully");
    }
} 