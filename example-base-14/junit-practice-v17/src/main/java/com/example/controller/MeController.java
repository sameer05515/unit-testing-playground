package com.example.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MeController {

    @GetMapping("/api/me")
    public MeResponse me(Authentication authentication) {
        List<String> authorities = authentication.getAuthorities()
            .stream()
            .map(a -> a.getAuthority())
            .toList();

        return new MeResponse(authentication.getName(), authorities);
    }

    public record MeResponse(String username, List<String> authorities) {
    }
}
