package com.bikalp.eserentalservice.dto.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResetPasswordResponse {
    private String message;
    private String username;
}
