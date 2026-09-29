package com.example.orders;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @GetMapping("/health")
    public String health() {
        return "order-service-up";
    }

    @GetMapping
    public String orders() {
        return "order-service-orders";
    }
}
