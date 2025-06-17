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
        return registerResponse(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<GlobalAPIResponse> login(@Valid @RequestBody LoginRequest request) {
        return loginResponse(authService.login(request));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<GlobalAPIResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        return forgotPasswordResponse(authService.forgotPassword(request));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<GlobalAPIResponse> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        return resetPasswordResponse(authService.resetPassword(request));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<GlobalAPIResponse> verifyOTP(@Valid @RequestBody VerifyOTPRequest request) {
        return verifyOTPResponse(authService.verifyOTP(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<GlobalAPIResponse> logout() {
        authService.logout();
        return logoutResponse();
    }
} 