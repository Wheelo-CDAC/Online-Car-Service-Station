package com.wheelo.service;

import com.wheelo.dao.CustomerDao;
import com.wheelo.dto.CustomerSignupDTO;
import com.wheelo.dto.ProfileUpdateDTO;
import com.wheelo.entities.CustomerDetails;
import com.wheelo.exceptions.CustomerAlreadyExistsException;
import com.wheelo.exceptions.CustomerNotFoundException;
import com.wheelo.exceptions.InvalidCustomerIdException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService, UserDetailsService {


	private final PasswordEncoder passwordEncoder;

	public CustomerServiceImpl(PasswordEncoder passwordEncoder) {
		this.passwordEncoder = passwordEncoder;
	}
	@Autowired
	private CustomerDao customerDao;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		CustomerDetails dbUser = customerDao.findByEmail(email);
		if(dbUser == null)
			throw new UsernameNotFoundException("No user exists!");
		return dbUser;
	}

	@Override
	public void addCustomer(CustomerSignupDTO customerSignupDTO) {
		CustomerDetails customerDetails = customerDao.findByEmail(customerSignupDTO.getEmail());
		if(customerDetails != null) {
			throw new CustomerAlreadyExistsException("Customer already exists");
		}
		customerDao.save(CustomerDTOToEntity(customerSignupDTO));
	}

	@Override
	public List<CustomerDetails> getAllCustomers() {
		return customerDao.findByRole("ROLE_CUSTOMER");
	}

	@Override
	public String updatProfile(ProfileUpdateDTO profileUpdateDTO, int customerId) {
		Optional<CustomerDetails> customerDetails = customerDao.findById(customerId);
		if(customerDetails.isEmpty())
			throw new CustomerNotFoundException("Customer not found!");
		CustomerDetails c = customerDetails.get();
		c.setFirstName(profileUpdateDTO.getFirstName());
		c.setLastName(profileUpdateDTO.getLastName());
		c.setPhone(profileUpdateDTO.getPhone());
		c.setAddress(profileUpdateDTO.getAddress());
		customerDao.save(c);
		return "Updated Details";
	}

	private CustomerDetails CustomerDTOToEntity(CustomerSignupDTO customerSignupDTO) {
		CustomerDetails customerDetails = new CustomerDetails();
		customerDetails.setFirstName(customerSignupDTO.getFirstName());
		customerDetails.setLastName(customerSignupDTO.getLastName());
		customerDetails.setPhone(customerSignupDTO.getPhone());
		customerDetails.setEmail(customerSignupDTO.getEmail());

		String encoded = passwordEncoder.encode(customerSignupDTO.getPassword());
		customerDetails.setPassword(encoded);
		customerDetails.setAddress(customerSignupDTO.getAddress());
		customerDetails.set_active(true);
		customerDetails.setRole("ROLE_CUSTOMER");
		customerDetails.setCreationDate(LocalDateTime.now(ZoneOffset.UTC));
		customerDetails.setUpdatedOn(LocalDateTime.now(ZoneOffset.UTC));
		return customerDetails;
	}

	@Override
	public CustomerSignupDTO findById(int customerId) {
	Optional<CustomerDetails> customerDetails = customerDao.findById(customerId);
	if(!customerDetails.isPresent())
		throw new InvalidCustomerIdException("Invalid Customer Id!");

	CustomerSignupDTO dto = new CustomerSignupDTO();
	dto.setEmail(customerDetails.get().getEmail());
	dto.setPhone(customerDetails.get().getPhone());
	dto.setFirstName(customerDetails.get().getFirstName());
	dto.setLastName(customerDetails.get().getLastName());
	dto.setPassword(customerDetails.get().getPassword());
	dto.setAddress(customerDetails.get().getAddress());

		 return dto;
	}

}
