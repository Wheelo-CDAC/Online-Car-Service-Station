package com.wheelo.service;

import com.wheelo.dto.BookingRequestDTO;
import com.wheelo.dto.BookingResponseDTO;

import java.util.List;

public interface BookingService {

    void createBooking(BookingRequestDTO bookingRequestDto, int customerId);

    List<BookingResponseDTO> getBookings(String token, String roles);

    String updateBookingStatus(long bookingId, String bookingStatus);

    String updatePaymentStatus(long bookingId, String paymentStatus);
}
