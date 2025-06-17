package com.bikalp.eserentalservice.entity;

import com.bikalp.eserentalservice.entity.base.BaseEntity;
import com.bikalp.eserentalservice.enums.BookingStatus;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Booking entity class.
 * Represents bookings made by customers for rooms.
 */
@Getter
@Setter
@Entity
@Table(name = "bookings")
public class Booking extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @NotNull
    @Positive
    private BigDecimal totalPrice;

    private LocalDateTime bookingDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.PENDING;

    private String specialRequests;

    private int numberOfGuests = 1;

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    private Payment payment;
}
