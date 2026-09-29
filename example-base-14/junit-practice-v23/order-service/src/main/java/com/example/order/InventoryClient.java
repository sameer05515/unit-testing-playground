package com.example.order;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class InventoryClient {

    private final RestTemplate restTemplate = new RestTemplate();

    public String relayUserToken(String authorization) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorization);

        ResponseEntity<String> response =
            restTemplate.exchange(
                "http://localhost:9099/inventory/1",
                HttpMethod.GET,
                new HttpEntity<>(headers),
                String.class
            );

        return response.getBody();
    }

    public String callWithServiceToken(String serviceToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(serviceToken);

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
