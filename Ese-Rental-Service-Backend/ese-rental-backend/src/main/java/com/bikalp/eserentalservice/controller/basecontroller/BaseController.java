package com.bikalp.eserentalservice.controller.basecontroller;

import com.bikalp.eserentalservice.dto.GlobalAPIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {

    protected ResponseEntity<GlobalAPIResponse> registerResponse(Object data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message("User register successfully..!!")
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> loginResponse(Object data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message("User login successfully..!!")
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> resetPasswordResponse(Object data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message("Password reset successfully..!!")
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> forgotPasswordResponse(Object data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message("Password reset OTP sent successfully..!!")
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> customResponse(String message, Object data) {
        return ResponseEntity.ok(GlobalAPIResponse.builder()
                .status(true)
                .message(message)
                .data(data)
                .build());
    }

    protected ResponseEntity<GlobalAPIResponse> createdResponse(String message, Object data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message(message)
                        .data(data)
                        .build());
    }
} 