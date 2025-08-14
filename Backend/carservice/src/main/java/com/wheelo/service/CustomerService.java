package com.wheelo.service;

import com.wheelo.dto.CustomerSignupDTO;
import com.wheelo.dto.ProfileUpdateDTO;
import com.wheelo.entities.CustomerDetails;

import java.util.List;

public interface CustomerService {

    CustomerSignupDTO findById(int customerId);
    void addCustomer(CustomerSignupDTO customerSignupDTO);

    List<CustomerDetails> getAllCustomers();

    String updatProfile(ProfileUpdateDTO profileUpdateDTO,int customerId);
}
