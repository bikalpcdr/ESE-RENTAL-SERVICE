package com.bikalp.eserentalservice.entity;

import com.bikalp.eserentalservice.entity.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "room_images")
public class RoomImage extends BaseEntity {
    
    @Column(columnDefinition = "TEXT")
    private String imageData; // Store Base64 encoded image

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    private boolean isPrimary = false;
}
