package com.bikalp.eserentalservice.service;

import com.bikalp.eserentalservice.dto.auth.*;
import com.bikalp.eserentalservice.entity.User;

public interface AuthService {
    /**
     * Register a new user
     * @param request the registration request
     * @return authentication response with token
     */
    AuthResponse register(RegisterRequest request);

    /**
     * Authenticate a user
     * @param request the login request
     * @return authentication response with token
     */
    AuthResponse login(LoginRequest request);

    ForgetPasswordResponse forgotPassword(ForgotPasswordRequest request);

    VerifyOTPResponse verifyOTP(VerifyOTPRequest request);

    ResetPasswordResponse resetPassword(ResetPasswordRequest request);

    void logout();
} 