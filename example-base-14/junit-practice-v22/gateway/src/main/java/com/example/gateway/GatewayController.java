package com.example.gateway;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gateway")
public class GatewayController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "gateway-public";
    }

    @GetMapping("/orders/{id}")
    public String order(@PathVariable Long id) {
        return "gateway-order-" + id;
    }
}
