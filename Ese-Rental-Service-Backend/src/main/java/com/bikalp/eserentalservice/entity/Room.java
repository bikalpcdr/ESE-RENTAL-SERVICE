package com.bikalp.eserentalservice.entity;

import com.bikalp.eserentalservice.entity.base.BaseEntity;
import com.bikalp.eserentalservice.enums.RoomType;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.List;

/**
 * Room entity class.
 * Represents rooms that can be rented in the system.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@EqualsAndHashCode
@Table(name = "rooms")
public class Room extends BaseEntity {

    @NotBlank(message = "Title is required")
    private String title;

    @Column(length = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal pricePerMonth;

    private String address;

    private int numberOfRooms;

    private int capacity; // number of people

    private boolean available = true;

    @Column(length = 2000)
    private String amenities; // comma-separated list of amenities

    @ManyToOne
    @JoinColumn(name = "landlord_id")
    private User landlord;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<Booking> bookings;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    private List<RoomImage> roomImages;
}
