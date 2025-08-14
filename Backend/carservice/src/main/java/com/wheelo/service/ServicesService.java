package com.wheelo.service;

import com.wheelo.dto.ServiceRquestDTO;
import com.wheelo.entities.ServiceDetails;

import java.util.List;

public interface ServicesService {
     List<ServiceDetails> findAllServices();
     String addService(ServiceRquestDTO newService);
     String updateService(Long id, ServiceRquestDTO newService);

     String deleteService(long serviceId);

}
