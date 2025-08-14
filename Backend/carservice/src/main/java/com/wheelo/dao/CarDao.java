package com.wheelo.dao;

import com.wheelo.entities.CarDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarDao extends JpaRepository<CarDetails, Integer> {

    CarDetails findByVehicleNo(String vehicleNo);
}
