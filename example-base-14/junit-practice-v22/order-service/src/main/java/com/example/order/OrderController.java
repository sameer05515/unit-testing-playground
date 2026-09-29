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

    @GetMapping("/{id}")
    public String getOrder(
        @PathVariable Long id,
        @RequestHeader(
            value = "Authorization",
            required = false
        ) String authorization
    ) {
        String inventory = inventoryClient.checkInventory(authorization);
        return "order-" + id + "-" + inventory;
    }
}
