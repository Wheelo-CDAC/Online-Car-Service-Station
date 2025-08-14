package com.wheelo.dao;

import com.wheelo.entities.ServiceDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceDao extends JpaRepository<ServiceDetails, Long> {
    List<ServiceDetails> findByStatusTrue();
}
