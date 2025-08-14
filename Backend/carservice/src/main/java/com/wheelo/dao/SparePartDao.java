package com.wheelo.dao;

import com.wheelo.entities.SparePartDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SparePartDao extends JpaRepository<SparePartDetails, Long > {

}
