package com.example.gateway;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/gateway")
public class GatewayController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "gateway-public";
    }

    @GetMapping("/users/{id}")
    public String userRoute(@PathVariable Long id) {
        return "gateway-user-route-" + id;
    }

    @GetMapping("/orders")
    public String orderRoute() {
        return "gateway-order-route";
    }

    @GetMapping("/admin/dashboard")
    public String admin() {
        return "gateway-admin";
    }
}
