package com.wheelo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "service_details")
public class ServiceDetails {
    @Id
    @Column(name = "service_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long serviceId;
    @Column(name = "service_name", length = 30)
    private String serviceName;
    @Column(name = "description", length = 100)
    private String description;
    @Column(name = "price")
    private Double price;
    @Column(name = "creation_date")
    private LocalDateTime creationDate;
    @Column(name = "updatedOn")
    private LocalDateTime updatedOn;

    @Column(name = "status")
    private boolean status;
}