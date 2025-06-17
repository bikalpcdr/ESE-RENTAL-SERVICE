package com.bikalp.eserentalservice.entity;

import com.bikalp.eserentalservice.entity.base.BaseEntity;
import com.bikalp.eserentalservice.enums.PaymentMethod;
import com.bikalp.eserentalservice.enums.PaymentStatus;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Payment entity class.
 * Represents payments made for bookings.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payments")
public class Payment extends BaseEntity {

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @NotNull
    private BigDecimal amount;

    private LocalDateTime paymentDate = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private PaymentStatus status = PaymentStatus.PENDING;

    private String transactionId;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
}
