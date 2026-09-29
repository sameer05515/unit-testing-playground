package com.example.inventory;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @GetMapping("/health")
    public String health() {
        return "inventory-up";
    }

    @GetMapping("/{id}")
    public String inventory(@PathVariable Long id) {
        return "inventory-" + id;
    }
}
