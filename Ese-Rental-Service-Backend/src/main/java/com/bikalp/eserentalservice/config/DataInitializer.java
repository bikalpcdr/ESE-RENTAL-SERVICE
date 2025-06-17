package com.bikalp.eserentalservice.config;

import com.bikalp.eserentalservice.entity.User;
import com.bikalp.eserentalservice.enums.UserRole;
import com.bikalp.eserentalservice.repository.RoomRepo;
import com.bikalp.eserentalservice.repository.UserRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create superadmin user if not exists
        if (!userRepo.existsByEmail("superadmin@rentalservice.com")) {
            log.info("Creating superadmin user...");
            User superadmin = new User();
            superadmin.setUsername("superadmin");
            superadmin.setFullName("Super Admin");
            superadmin.setEmail("superadmin@rentalservice.com");
            superadmin.setPassword(passwordEncoder.encode("SuperAdmin@123"));
            superadmin.setPhoneNumber("+1234567890");
            superadmin.setRole(UserRole.SUPER_ADMIN);
            superadmin.setEnabled(true);
            superadmin.setCreatedAt(LocalDateTime.now());
            superadmin.setUpdatedAt(LocalDateTime.now());
            userRepo.save(superadmin);
            log.info("Superadmin user created successfully!");
        } else {
            log.info("Superadmin user already exists");
        }
    }
} 