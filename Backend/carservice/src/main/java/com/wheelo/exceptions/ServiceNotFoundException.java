package com.wheelo.exceptions;

public class ServiceNotFoundException extends RuntimeException{

    public  ServiceNotFoundException(String message) {
        super(message);
    }
}