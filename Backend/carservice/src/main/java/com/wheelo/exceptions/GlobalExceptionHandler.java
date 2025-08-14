package com.wheelo.exceptions;

import com.wheelo.constants.ResponseStatus;
import com.wheelo.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
        System.out.println("in handle res not found exc");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ResponseStatus.ERROR.name()));
    }

    @ExceptionHandler(CustomerAlreadyExistsException.class)
    public ResponseEntity<?> customerAlreadyExistsException(CustomerAlreadyExistsException e) {
        System.out.println("in handle res not found exc");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ResponseStatus.ERROR.name()));
    }

    @ExceptionHandler(ServiceNotFoundException.class)
    public ResponseEntity<?> ServiceNotFoundException(CustomerNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), ResponseStatus.ERROR.name()));
    }
}
