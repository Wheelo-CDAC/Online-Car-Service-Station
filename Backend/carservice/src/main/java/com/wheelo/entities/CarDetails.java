package com.wheelo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name="car_details")
public class CarDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "car_id")
    private int carId;

    @Column(name = "model")
    private String model;

    @Column(name = "vehicle_no")
    private String vehicleNo;

    @ManyToOne
    @JoinColumn(name="customer_id")
    private CustomerDetails customerId;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;
    @Column(name = "updatedOn")
    private LocalDateTime updatedOn;

}
