package com.wheelo.service;

import com.wheelo.dao.ServiceDao;
import com.wheelo.dto.ServiceRquestDTO;
import com.wheelo.entities.ServiceDetails;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ServicesServiceImpl implements ServicesService {

    @Autowired
    ServiceDao serviceDao;

    @Override
    public List<ServiceDetails> findAllServices() {
    return serviceDao.findByStatusTrue();
    }

    @Override
    public String addService(ServiceRquestDTO newService) {

        ServiceDetails serviceDetails = new ServiceDetails();
        serviceDetails.setServiceName(newService.getServiceName());
        serviceDetails.setDescription(newService.getDescription());
        serviceDetails.setPrice(newService.getPrice());
        serviceDetails.setStatus(true);

          serviceDao.save(serviceDetails);
        return "added new service";
    }

    public String updateService(Long id, ServiceRquestDTO newService){
        Optional<ServiceDetails> existingOptional = serviceDao.findById(id);
        if (existingOptional.isEmpty()) {
            throw new RuntimeException("Service with ID " + id + " not found.");
        }

        ServiceDetails existingService = existingOptional.get();
        existingService.setServiceName(newService.getServiceName());
        existingService.setDescription(newService.getDescription());
        existingService.setPrice(newService.getPrice());

        existingService.setUpdatedOn(LocalDateTime.now());
        serviceDao.save(existingService);
        return "Service updated successfully.";
    }

    @Override
    public String deleteService(long serviceId) {

        if(!serviceDao.existsById(serviceId))
            throw new RuntimeException("Spare part with ID " + serviceId + " not found.");
        Optional<ServiceDetails> serviceDetails = serviceDao.findById(serviceId);
        ServiceDetails deleted = serviceDetails.get();
        deleted.setStatus(false);

        return "Deleted service with id " + serviceId;
    }
}

