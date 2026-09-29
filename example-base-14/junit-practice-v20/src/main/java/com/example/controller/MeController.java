package com.example.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
public class MeController {

    @GetMapping("/api/me")
    public MeResponse me(Authentication authentication) {
        return new MeResponse(
            authentication.getName(),
            authentication.getAuthorities()
                .stream()
                .map(a -> a.getAuthority())
                .sorted()
                .toList()
        );
    }

    public record MeResponse(
        String username,
        java.util.List<String> authorities
    ) {}
}
