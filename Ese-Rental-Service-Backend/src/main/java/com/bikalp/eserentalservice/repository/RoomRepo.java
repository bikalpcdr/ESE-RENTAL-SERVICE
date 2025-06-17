package com.bikalp.eserentalservice.repository;

import com.bikalp.eserentalservice.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for Room entity.
 * Provides data access operations for rooms.
 */
@Repository
public interface RoomRepo extends JpaRepository<Room, Long> {
}
