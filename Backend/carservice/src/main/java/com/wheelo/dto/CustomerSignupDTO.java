package com.wheelo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerSignupDTO
{
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private String address;
}
