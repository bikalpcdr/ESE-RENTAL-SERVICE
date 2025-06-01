package com.bikalp.eserentalservice.controller.basecontroller;

import com.bikalp.eserentalservice.dto.GlobalAPIResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class BaseController {

    protected ResponseEntity<GlobalAPIResponse> successResponse(String message, Object data) {
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

    protected ResponseEntity<GlobalAPIResponse> noContentResponse(String message) {
        return ResponseEntity.ok(GlobalAPIResponse.builder()
                .status(true)
                .message(message)
                .data(null)
                .build());
    }
} 