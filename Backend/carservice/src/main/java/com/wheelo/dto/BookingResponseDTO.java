package com.wheelo.dto;

import lombok.*;

import java.sql.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO  {
    private int customerId;
    private long bookingId;
    private double amount;
    private String bookingStatus;
    private String paymentStatus;
    private Date serviceDate;
    private String model;
    private String vehicleNo;
    private String email;
    private String address;
    private String phoneNo;
    private List<String> serviceNames;
}