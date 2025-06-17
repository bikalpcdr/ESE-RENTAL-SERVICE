package com.bikalp.eserentalservice.dto.auth;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * DTO for forgot password request.
 * Contains the identifier (email or username) for password reset.
 */
@Data
public class ForgotPasswordRequest {
    
    @NotBlank(message = "Email or username is required")
    @Size(min = 3, max = 50, message = "Identifier must be between 3 and 50 characters")
    private String identifier; // Can be email or username
} 