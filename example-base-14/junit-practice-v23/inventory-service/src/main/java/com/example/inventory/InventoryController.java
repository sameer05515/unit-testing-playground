package com.example.inventory;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @GetMapping("/health")
    public String health() {
        return "inventory-up";
    }

    @GetMapping("/relay/{id}")
    public String relay(@PathVariable Long id) {
        return "inventory-relay-" + id;
    }

    @GetMapping("/service/{id}")
    public String service(@PathVariable Long id) {
        return "inventory-service-" + id;
    }
}
