package com.bikalp.eserentalservice.service.impl;

import com.bikalp.eserentalservice.exception.EmailMessagingException;
import com.bikalp.eserentalservice.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;

import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Value("${app.email.templates.password-reset}")
    private String passwordResetTemplate;

    @Value("${app.email.templates.welcome}")
    private String welcomeTemplate;

    @Override
    public void sendPasswordResetOTP(String to, String otp) throws Exception {
        log.info("Sending password reset OTP email to: {}", to);
        try {
            String subject = "Password Reset OTP";
            String content = loadTemplate(passwordResetTemplate)
                    .replace("{OTP_CODE}", otp);

            sendEmail(to, subject, content);
            log.info("Password reset OTP email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send password reset OTP email to: {}. Error: {}", to, e.getMessage(), e);
            throw new EmailMessagingException("Failed to send password reset OTP email..!!");
        }
    }

    @Override
    public void sendWelcomeEmail(String to, String username) throws Exception {
        log.info("Sending welcome email to: {}", to);
        try {
            String subject = "Welcome to ESE Rental Service";
            String content = loadTemplate(welcomeTemplate)
                    .replace("{USERNAME}", username);

            sendEmail(to, subject, content);
            log.info("Welcome email sent successfully to: {}", to);
        } catch (Exception e) {
            log.error("Failed to send welcome email to: {}. Error: {}", to, e.getMessage(), e);
            throw new EmailMessagingException("Failed to send welcome email..!!");
        }
    }

    private void sendEmail(String to, String subject, String content) throws EmailMessagingException {
        if (to == null || to.trim().isEmpty()) {
            throw new EmailMessagingException("Recipient email address cannot be null or empty..!!");
        }

        try {
            log.debug("Creating MimeMessage for email to: {}", to);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            // Set sender email
            if (fromEmail == null || fromEmail.trim().isEmpty()) {
                throw new EmailMessagingException("Sender email address is not configured..!!");
            }
            helper.setFrom(fromEmail);

            // Set recipient
            helper.setTo(to.trim());

            // Set subject
            if (subject == null || subject.trim().isEmpty()) {
                throw new EmailMessagingException("Email subject cannot be null or empty..!!");
            }
            helper.setSubject(subject.trim());

            // Set content
            if (content == null || content.trim().isEmpty()) {
                throw new EmailMessagingException("Email content cannot be null or empty..!!");
            }
            helper.setText(content.trim(), true); // true indicates HTML content

            log.debug("Attempting to send email to: {}", to);
            mailSender.send(message);
            log.debug("Email sent successfully to: {}", to);
        } catch (EmailMessagingException e) {
            log.error("Failed to send email to: {}. Error: {}", to, e.getMessage(), e);
            throw new EmailMessagingException("Failed to send email");
        } catch (Exception e) {
            log.error("Unexpected error while sending email to: {}. Error: {}", to, e.getMessage(), e);
            throw new EmailMessagingException("Unexpected error while sending email..!!");
        }
    }

    private String loadTemplate(String templatePath) throws IOException {
        if (templatePath == null || templatePath.trim().isEmpty()) {
            throw new IOException("Template path cannot be null or empty..!!");
        }

        try {
            log.debug("Loading email template from path: {}", templatePath);
            ClassPathResource resource = new ClassPathResource(templatePath.trim());
            
            if (!resource.exists()) {
                throw new IOException("Email template not found at path: " + templatePath);
            }
            
            try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
                String content = FileCopyUtils.copyToString(reader);
                if (content.trim().isEmpty()) {
                    throw new IOException("Email template is empty: " + templatePath);
                }
                log.debug("Successfully loaded email template from: {}", templatePath);
                return content;
            }
        } catch (IOException e) {
            log.error("Failed to load email template from path: {}. Error: {}", templatePath, e.getMessage(), e);
            throw new IOException("Failed to load email template: " + e.getMessage(), e);
        }
    }
} 