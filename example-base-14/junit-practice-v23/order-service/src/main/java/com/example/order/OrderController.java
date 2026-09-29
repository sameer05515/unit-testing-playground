package com.example.order;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final InventoryClient inventoryClient;

    public OrderController(InventoryClient inventoryClient) {
        this.inventoryClient = inventoryClient;
    }

    @GetMapping("/health")
    public String health() {
        return "order-service-up";
    }

    @GetMapping("/relay/{id}")
    public String relay(
        @PathVariable Long id,
        @RequestHeader("Authorization") String authorization
    ) {
        return "order-" + id + "-"
            + inventoryClient.relayUserToken(authorization);
    }

    @GetMapping("/service-token/{id}")
    public String serviceToken(
        @PathVariable Long id,
        @RequestHeader("X-Service-Token") String serviceToken
    ) {
        return "order-" + id + "-"
            + inventoryClient.callWithServiceToken(serviceToken);
    }
}
