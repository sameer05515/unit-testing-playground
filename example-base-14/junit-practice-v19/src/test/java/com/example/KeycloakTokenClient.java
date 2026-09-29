package com.example;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

class KeycloakTokenClient {

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final String tokenEndpoint;

    KeycloakTokenClient(String keycloakBaseUrl) {
        this.tokenEndpoint =
            keycloakBaseUrl + "/realms/junit-demo/protocol/openid-connect/token";
    }

    String passwordToken(String username, String password) throws Exception {
        String form =
            "grant_type=password" +
            "&client_id=junit-api" +
            "&username=" + encode(username) +
            "&password=" + encode(password);

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(tokenEndpoint))
            .header("Content-Type", "application/x-www-form-urlencoded")
            .POST(HttpRequest.BodyPublishers.ofString(form))
            .build();

        HttpResponse<String> response =
            httpClient.send(request, HttpResponse.BodyHandlers.ofString());

        if (response.statusCode() != 200) {
            throw new IllegalStateException(
                "Keycloak token request failed: " +
                response.statusCode() + " " + response.body()
            );
        }

        JsonNode json = objectMapper.readTree(response.body());

        return json.get("access_token").asText();
    }

    private String encode(String value) {
        return java.net.URLEncoder.encode(
            value,
            StandardCharsets.UTF_8
        );
    }
}
