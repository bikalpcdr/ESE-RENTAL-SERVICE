package com.bikalp.eserentalservice.repository;

import com.bikalp.eserentalservice.entity.RoomImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomImageRepo extends JpaRepository<RoomImage, Long> {
}