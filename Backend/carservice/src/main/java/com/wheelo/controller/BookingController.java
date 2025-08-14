package com.wheelo.controller;

import com.wheelo.dto.BookingRequestDTO;
import com.wheelo.dto.BookingResponseDTO;
import com.wheelo.security.JwtUtil;
import com.wheelo.service.BookingService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
@AllArgsConstructor
public class BookingController {

    @Autowired
    BookingService bookingService;
    @Autowired
    private JwtUtil jwtUtil;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addbooking")
    public ResponseEntity<?> createBooking(@RequestHeader("Authorization") String authHeader, @RequestBody BookingRequestDTO bookingRequestDto) {
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        int customerId = jwtUtil.getId(token);
        bookingService.createBooking(bookingRequestDto, customerId);
        return ResponseEntity.ok("Booking created successfully.");
    }

    @GetMapping("")
    public ResponseEntity<?> getAllBookings(@RequestHeader("Authorization") String authHeader) {
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }
        String roles = jwtUtil.getRoles(token);
        List<BookingResponseDTO> bookingResponseDtoList = bookingService.getBookings(token, roles);
        return ResponseEntity.ok(bookingResponseDtoList);
    }

    @PutMapping("/{bookingId}")
    public ResponseEntity<String> updateBookingStatus(@PathVariable long bookingId, @RequestParam String bookingStatus) {
        String response = bookingService.updateBookingStatus(bookingId, bookingStatus);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{bookingId}/payment")
    public ResponseEntity<?> updatePaymentStatus(@PathVariable long bookingId, @RequestParam String paymentStatus){
        String response = bookingService.updatePaymentStatus(bookingId, paymentStatus);
        return ResponseEntity.ok(response);
    }

}
