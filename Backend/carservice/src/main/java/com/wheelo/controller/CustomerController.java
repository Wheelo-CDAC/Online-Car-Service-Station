package com.wheelo.controller;

import com.wheelo.dto.Credentials;
import com.wheelo.dto.CustomerSignupDTO;
import com.wheelo.dto.ProfileUpdateDTO;
import com.wheelo.entities.CustomerDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.wheelo.security.JwtUtil;
import com.wheelo.service.CustomerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
@AllArgsConstructor
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
	PasswordEncoder pwen;

    @PostMapping("/signup")
    public ResponseEntity<?> Signup(@RequestBody CustomerSignupDTO customerSignupDTO){
        customerService.addCustomer(customerSignupDTO);
        return ResponseEntity.ok("SUCCESS");
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody Credentials cr){

        Authentication auth = new UsernamePasswordAuthenticationToken(cr.getEmail(), cr.getPassword());
        auth = authManager.authenticate(auth);

        if (auth.isAuthenticated()) {
            return  ResponseEntity.ok(jwtUtil.createToken(auth));
        } else {
            throw new RuntimeException("invalid access");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> profile(@RequestHeader("Authorization") String authHeader){
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            token = authHeader.substring(7);
                token = authHeader.replace("Bearer" , "" ).trim();
        }
        int customerId = jwtUtil.getId(token);
        CustomerSignupDTO customerSignupDTO = customerService.findById(customerId);
        return ResponseEntity.ok(customerSignupDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<?> allcustomers(){
        List<CustomerDetails> list = customerService.getAllCustomers();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileUpdateDTO profileUpdateDTO,@RequestHeader("Authorization") String authHeader){
        String token = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//            token = authHeader.substring(7);
            token = authHeader.replace("Bearer" , "" ).trim();
        }
        int customerId = jwtUtil.getId(token);
        String msg = customerService.updatProfile(profileUpdateDTO,customerId);
    return ResponseEntity.ok(msg);
    }


}
