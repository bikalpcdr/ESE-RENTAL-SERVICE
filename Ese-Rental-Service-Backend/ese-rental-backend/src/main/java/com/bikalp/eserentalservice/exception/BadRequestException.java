package com.bikalp.eserentalservice.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception thrown when a request contains invalid data or violates business rules.
 * This will result in a 400 Bad Request response.
 */
public class BadRequestException extends BaseException {
    
    private static final String ERROR_CODE = "BAD_REQUEST";

    public BadRequestException(String message) {
        super(message, HttpStatus.BAD_REQUEST, ERROR_CODE);
    }

    public BadRequestException(String message, Throwable cause) {
        super(message, HttpStatus.BAD_REQUEST, ERROR_CODE, cause);
    }
} 