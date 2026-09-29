package com.example.users;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @GetMapping("/health")
    public String health() {
        return "user-service-up";
    }

    @GetMapping("/{id}")
    public String getUser(@PathVariable Long id) {
        return "user-service-user-" + id;
    }
}
