package com.wheelo.controller;

import com.wheelo.dto.ServiceRquestDTO;
import com.wheelo.entities.ServiceDetails;
import com.wheelo.service.ServicesService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services")
@AllArgsConstructor
public class ServicesController {
    private static final Logger logger = LoggerFactory.getLogger(ServicesController.class);

    @Autowired
    private ServicesService servicesService;

    @GetMapping("/allservices")
    public ResponseEntity<?> getAllServices(){
        List<ServiceDetails> list = servicesService.findAllServices();
        return ResponseEntity.ok(list);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(value = "/addservice")
    public ResponseEntity<?> addService(@RequestBody ServiceRquestDTO serviceRquestDTO, @RequestHeader("Authorization") String authHeader) {

        String msg =  servicesService.addService(serviceRquestDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(msg);

    }


    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(value = "/updateservice/{id}")
    public ResponseEntity<?> updateService(
            @PathVariable("id") Long id,
            @RequestBody  ServiceRquestDTO serviceRquestDTO) {

        String msg =  servicesService.updateService(id, serviceRquestDTO);
        //String msg = servicesService.updateService(id, updatedService);
        return ResponseEntity.ok(msg);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{serviceId}")
    public ResponseEntity<?> deleteService(@PathVariable long serviceId ){
        String msg = servicesService.deleteService(serviceId);
        return ResponseEntity.ok(msg);
    }
}
