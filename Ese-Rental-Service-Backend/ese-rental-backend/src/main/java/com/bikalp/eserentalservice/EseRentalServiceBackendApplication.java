package com.bikalp.eserentalservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class EseRentalServiceBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(EseRentalServiceBackendApplication.class, args);
	}

} 