package com.wheelo.service;

import com.wheelo.constants.BookingStatus;
import com.wheelo.constants.PaymentStatus;
import com.wheelo.dao.BookingDao;
import com.wheelo.dao.CarDao;
import com.wheelo.dao.CustomerDao;
import com.wheelo.dao.ServiceDao;
import com.wheelo.dto.BookingRequestDTO;
import com.wheelo.dto.BookingResponseDTO;
import com.wheelo.entities.BookingDetails;
import com.wheelo.entities.CarDetails;
import com.wheelo.entities.CustomerDetails;
import com.wheelo.entities.ServiceDetails;
import com.wheelo.exceptions.CustomerNotFoundException;
import com.wheelo.exceptions.ServiceNotFoundException;
import com.wheelo.security.JwtUtil;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class BookingServiceImpl implements BookingService{

    @Autowired
    CarDao carDao;
    @Autowired
    CustomerDao customerDao;
    @Autowired
    ServiceDao serviceDao;
    @Autowired
    BookingDao bookingDao;

    @Autowired
    JwtUtil jwtUtil;
    @Override
    public void createBooking(BookingRequestDTO bookingRequestDto, int customerId) {
        CustomerDetails customerDetails = customerDao.findByCustomerId(customerId);
        if(customerDetails == null) {
            throw new CustomerNotFoundException("Customer not found");
        }
        CarDetails carDetails = carDao.findByVehicleNo(bookingRequestDto.getVehicleNo());
        if (carDetails==null) {
            carDetails = new CarDetails();
            carDetails.setModel(bookingRequestDto.getModel());
            carDetails.setVehicleNo(bookingRequestDto.getVehicleNo());
            carDetails.setCustomerId(customerDetails);
            carDetails.setCreationDate(LocalDateTime.now(ZoneOffset.UTC));
            carDetails.setUpdatedOn(LocalDateTime.now(ZoneOffset.UTC));
            carDetails= carDao.save(carDetails);
        }
        List<ServiceDetails> services = serviceDao.findAllById(bookingRequestDto.getServiceIds());
        if (services.isEmpty()) throw new ServiceNotFoundException("Invalid Services");
        double totalAmount = services.stream().mapToDouble(s -> s.getPrice()).sum();

        BookingDetails booking = new BookingDetails();
        booking.setCustomerDetails(customerDetails);
        booking.setCarDetails(carDetails);
        booking.setSelectedServices(services);
        booking.setAmount(totalAmount);
        booking.setBookingStatus(BookingStatus.CONFIRM.name());
        booking.setPaymentStatus(PaymentStatus.UN_PAID.name());
        booking.setBookingDate(LocalDateTime.now(ZoneOffset.UTC));
        booking.setServiceDate(bookingRequestDto.getServiceDate()); // Expect ISO format
        bookingDao.save(booking);
    }




    @Override
    public List<BookingResponseDTO> getBookings(String token, String roles) {
        List<Object[]> bookingDetails;
        List<BookingResponseDTO> bookingResponseDtoList = new ArrayList<>();
        if(roles.equals("ROLE_ADMIN")) {
            bookingDetails= bookingDao.getAllBookings();
        } else {
            int customerId = jwtUtil.getId(token);
            bookingDetails = bookingDao.getBookingsForGivenCustomerId(customerId);
        }
        System.out.println("bookingdetails:"  + bookingDetails);
        bookingDetails.forEach(bd -> {
            BookingResponseDTO bookingResponseDto = new BookingResponseDTO();
            bookingResponseDto.setCustomerId((int) bd[0]);
            long bookingId=(Long) bd[1];
            System.out.println("booking id: " +bookingId);
            bookingResponseDto.setBookingId(bookingId);
            bookingResponseDto.setAmount((Double) bd[2]);
            bookingResponseDto.setBookingStatus((String) bd[3]);
            bookingResponseDto.setPaymentStatus((String) bd[4]);
            bookingResponseDto.setServiceDate((Date) bd[5]);
            bookingResponseDto.setModel((String) bd[6]);
            bookingResponseDto.setVehicleNo((String) bd[7]);
            bookingResponseDto.setEmail((String) bd[8]);
            bookingResponseDto.setAddress((String) bd[9]);
            bookingResponseDto.setPhoneNo((String) bd[10]);
            bookingResponseDto.setServiceNames(bookingDao.getServiceNamesForGivenBooking(bookingId));
            bookingResponseDtoList.add(bookingResponseDto);
        });
        return bookingResponseDtoList;
    }

    @Override
    public String updateBookingStatus(long bookingId, String bookingStatus) {
        Optional<BookingDetails> bookingDetails= bookingDao.findById(bookingId);
        if(bookingDetails.isEmpty())
            throw new RuntimeException("Booking not found");
        BookingDetails updatable =  bookingDetails.get();
        updatable.setBookingStatus(bookingStatus);
        return "Updated booking status!";
    }

    @Override
    public String updatePaymentStatus(long bookingId, String paymentStatus) {

        Optional<BookingDetails> bookingDetails = bookingDao.findById(bookingId);
        if(bookingDetails.isEmpty())
            throw new RuntimeException("Booking not found!");
        BookingDetails updatable = bookingDetails.get();
        updatable.setPaymentStatus(paymentStatus);
        return "Payment done!";
    }
}
