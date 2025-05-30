package com.bikalp.eserentalservice.service;

import com.bikalp.eserentalservice.dto.auth.AuthResponse;
import com.bikalp.eserentalservice.dto.auth.LoginRequest;
import com.bikalp.eserentalservice.dto.auth.RegisterRequest;

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
} 