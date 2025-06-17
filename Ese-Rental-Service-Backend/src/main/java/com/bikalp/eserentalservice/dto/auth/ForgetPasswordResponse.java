package com.bikalp.eserentalservice.dto.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ForgetPasswordResponse {
    private String email;
    private String phoneNumber;
    private String message;
}
