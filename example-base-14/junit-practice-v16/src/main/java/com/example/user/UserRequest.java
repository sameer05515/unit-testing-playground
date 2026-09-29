package com.example.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserRequest {
    @NotBlank(message="name is required")
    private String name;

    @NotBlank(message="email is required")
    @Email(message="email must be valid")
    private String email;

    public UserRequest(){}
    public String getName(){return name;}
    public String getEmail(){return email;}
    public void setName(String name){this.name=name;}
    public void setEmail(String email){this.email=email;}
}