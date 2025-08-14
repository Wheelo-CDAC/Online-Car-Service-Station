package com.wheelo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {
    private String message;
    private String status;

    public ApiResponse(String message, String status) {
        this.message = message;
        this.status = status;
    }

}