package com.wheelo.dao;

import com.wheelo.entities.CustomerDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerDao extends JpaRepository<CustomerDetails, Integer> {

	CustomerDetails findByEmail(String email);

    CustomerDetails findByCustomerId(int customerId);

    List<CustomerDetails> findByRole(String role);
}
