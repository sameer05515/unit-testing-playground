package com.example.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/service")
public class ServiceController {

    @GetMapping("/data")
    public String data() {
        return "service-data";
    }
}
