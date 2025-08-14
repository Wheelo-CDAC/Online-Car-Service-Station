package com.wheelo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "spare_part_details")
public class SparePartDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "part_id")
    private long partId;

    @Column(name = "part_name", length = 30)
    private String partName;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @Column(name = "updatedOn")
    private LocalDateTime updatedOn;
}
