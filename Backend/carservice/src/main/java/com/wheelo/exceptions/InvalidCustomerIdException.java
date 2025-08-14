package com.wheelo.exceptions;

public class InvalidCustomerIdException extends RuntimeException {
    public  InvalidCustomerIdException(String message) {
        super(message);
    }
}