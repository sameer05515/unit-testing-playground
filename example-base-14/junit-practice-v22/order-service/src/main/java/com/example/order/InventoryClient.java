package com.example.order;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class InventoryClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public String checkInventory(String authorizationHeader) {
        HttpHeaders headers = new HttpHeaders();

        if (authorizationHeader != null) {
            headers.set("Authorization", authorizationHeader);
        }

        ResponseEntity<String> response =
            restTemplate.exchange(
                "http://localhost:9099/inventory/1",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class
            );

        return response.getBody();
    }
}
