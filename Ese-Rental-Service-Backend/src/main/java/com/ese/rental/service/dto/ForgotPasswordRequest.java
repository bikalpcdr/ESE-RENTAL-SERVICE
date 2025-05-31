package com.ese.rental.service.dto;

import lombok.Data;

@Data
public class ForgotPasswordRequest {
    private String identifier; // Can be email or username
} 