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

    protected ResponseEntity<GlobalAPIResponse> verifyOTPResponse(Object data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message("OTP verified successfully..!!")
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

    protected ResponseEntity<GlobalAPIResponse> logoutResponse() {
        return ResponseEntity.ok(GlobalAPIResponse.builder()
                .status(true)
                .message("Logged out successfully..!!")
                .data(null)
                .build());
    }

    protected ResponseEntity<GlobalAPIResponse> createdResponse(String entityName, Object data) {
        String message = String.format("%s created successfully..!!", entityName);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message(message)
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> updateResponse(String entityName, Object data) {
        String message = String.format("%s  updated successfully..!!", entityName);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message(message)
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> fetchResponse(String entityName, Object data) {
        String message = String.format("%s  retrieved successfully..!!", entityName);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message(message)
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> fetchListResponse(String entityName, Object data) {
        String message = String.format("%s  retrieved successfully..!!", entityName);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message(message)
                        .data(data)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> deleteResponse(String entityName) {
        String message = String.format("%s  deleted successfully..!!", entityName);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message(message)
                        .data(null)
                        .build());
    }

    protected ResponseEntity<GlobalAPIResponse> toggleResponse(String entityName) {
        String message = String.format("%s  status toggled successfully..!!", entityName);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(GlobalAPIResponse.builder()
                        .status(true)
                        .message(message)
                        .data(null)
                        .build());
    }
} 