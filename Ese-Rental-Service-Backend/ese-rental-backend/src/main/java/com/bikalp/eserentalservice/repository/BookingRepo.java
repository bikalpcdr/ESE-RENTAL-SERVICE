package com.bikalp.eserentalservice.repository;

import com.bikalp.eserentalservice.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Booking entity.
 * Provides data access operations for bookings.
 */
@Repository
public interface BookingRepo extends JpaRepository<Booking, Long> {
}
