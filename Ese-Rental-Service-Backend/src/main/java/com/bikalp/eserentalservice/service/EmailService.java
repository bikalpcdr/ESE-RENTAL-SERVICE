package com.bikalp.eserentalservice.service;

public interface EmailService {
    void sendPasswordResetOTP(String to, String otp) throws Exception;
    void sendWelcomeEmail(String to, String username) throws Exception;
}