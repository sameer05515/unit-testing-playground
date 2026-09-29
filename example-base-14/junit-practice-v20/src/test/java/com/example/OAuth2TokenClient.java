package com.example;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

class OAuth2TokenClient {

    private final HttpClient client = HttpClient.newHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    private final String tokenEndpoint;

    OAuth2TokenClient(String keycloakBaseUrl) {
        this.tokenEndpoint =
            keycloakBaseUrl
            + "/realms/microservices-demo"
            + "/protocol/openid-connect/token";
    }

    String passwordGrant(String username, String password)
        throws Exception {

        String form =
            "grant_type=password"
            + "&client_id=todo-api"
            + "&username=" + encode(username)
            + "&password=" + encode(password);

        return postToken(form);
    }

    String clientCredentials(String clientId, String clientSecret)
        throws Exception {

        String form =
            "grant_type=client_credentials"
            + "&client_id=" + encode(clientId)
            + "&client_secret=" + encode(clientSecret);

        return postToken(form);
    }

    private String postToken(String form) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(tokenEndpoint))
            .header(
                "Content-Type",
                "application/x-www-form-urlencoded"
            )
            .POST(HttpRequest.BodyPublishers.ofString(form))
            .build();

        HttpResponse<String> response =
            client.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );

        if (response.statusCode() != 200) {
            throw new IllegalStateException(
                "Token endpoint failed: "
                + response.statusCode()
                + " "
                + response.body()
            );
        }

        JsonNode json = mapper.readTree(response.body());

        return json.get("access_token").asText();
    }

    private String encode(String value) {
        return java.net.URLEncoder.encode(
            value,
            StandardCharsets.UTF_8
        );
    }
}
