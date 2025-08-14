package com.wheelo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequestDTO {
    private List<Long> serviceIds;
    private String model;
    private String vehicleNo;
    private LocalDate serviceDate;
}