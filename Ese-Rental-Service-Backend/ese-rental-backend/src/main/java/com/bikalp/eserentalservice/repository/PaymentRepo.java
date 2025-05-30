package com.bikalp.eserentalservice.repository;

import com.bikalp.eserentalservice.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Payment entity.
 * Provides data access operations for payments.
 */
@Repository
public interface PaymentRepo extends JpaRepository<Payment, Long> {
}
