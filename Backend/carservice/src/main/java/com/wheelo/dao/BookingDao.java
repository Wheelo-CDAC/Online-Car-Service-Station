package com.wheelo.dao;

import com.wheelo.dto.BookingResponseDTO;
import com.wheelo.entities.BookingDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingDao extends JpaRepository<BookingDetails, Long> {

    @Query(value = "select cd.customer_id, bd.booking_id, bd.amount,bd.booking_status, bd.payment_status, bd.service_date, card.model, card.vehicle_no, cd.email, cd.address, cd.phone from booking_details bd, customer_details cd, car_details card where cd.customer_id=bd.customer_id and bd.vehicle_id=card.car_id;", nativeQuery = true)
    List<Object[]> getAllBookings();

    @Query(value = "select cd.customer_id, bd.booking_id, bd.amount,bd.booking_status, bd.payment_status, bd.service_date, card.model, card.vehicle_no, cd.email, cd.address, cd.phone from booking_details bd, customer_details cd, car_details card where cd.customer_id=bd.customer_id and bd.vehicle_id=card.car_id and cd.customer_id=?1;", nativeQuery = true)
    List<Object[]> getBookingsForGivenCustomerId(int customerId);

    @Query(value = "select distinct sd.service_name from service_details sd where sd.service_id in (select service_id from booking_services bs where bs.booking_id=?1);", nativeQuery = true)
    List<String> getServiceNamesForGivenBooking(long bookingId);
}

