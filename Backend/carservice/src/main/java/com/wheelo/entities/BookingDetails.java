package com.wheelo.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@RequiredArgsConstructor
@AllArgsConstructor
@Table(name="booking_details")
public class BookingDetails{

    @Id
    @Column(name = "booking_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long booking_id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private CustomerDetails customerDetails;

    @OneToOne
    @JoinColumn(name = "vehicle_id")
    private CarDetails carDetails;

    @Column(name = "booking_status")
    private String bookingStatus;

    @Column(name = "amount")
    private double amount;

    @Column(name = "booking_date")
    private LocalDateTime bookingDate;

    @OneToOne
    @JoinColumn(name = "feedback_id")
    private FeedbackDetails feedbackDetails;

    @Column(name = "service_date")
    private LocalDate serviceDate;

    @Column(name = "payment_status")
    private String paymentStatus;

    @ManyToMany(cascade = {CascadeType.PERSIST,CascadeType.MERGE})
    @JoinTable(
            name = "booking_services",
            joinColumns = @JoinColumn(name = "booking_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id")
    )
    private List<ServiceDetails> selectedServices = new ArrayList<>();
}
