package com.example.order;

import com.github.tomakehurst.wiremock.WireMockServer;
import org.junit.jupiter.api.*;
import org.springframework.web.client.RestTemplate;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.junit.jupiter.api.Assertions.*;

class TokenRelayWireMockTest {

    private WireMockServer wireMock;

    @BeforeEach
    void start() {
        wireMock = new WireMockServer(0);
        wireMock.start();
    }

    @AfterEach
    void stop() {
        wireMock.stop();
    }

    @Test
    void tokenRelay_shouldForwardIncomingUserJwt() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/1"))
                .withHeader(
                    "Authorization",
                    equalTo("Bearer user-jwt")
                )
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withBody("inventory-relay-1")
                )
        );

        RestTemplate client = new RestTemplate();

        org.springframework.http.HttpHeaders headers =
            new org.springframework.http.HttpHeaders();
        headers.setBearerAuth("user-jwt");

        var response = client.exchange(
            wireMock.baseUrl() + "/inventory/1",
            org.springframework.http.HttpMethod.GET,
            new org.springframework.http.HttpEntity<>(headers),
            String.class
        );

        assertEquals(
            "inventory-relay-1",
            response.getBody()
        );

        wireMock.verify(
            getRequestedFor(urlEqualTo("/inventory/1"))
                .withHeader(
                    "Authorization",
                    equalTo("Bearer user-jwt")
                )
        );
    }

    @Test
    void tokenRelay_missingToken_shouldNotBeAcceptedByContract() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/1"))
                .willReturn(aResponse().withStatus(401))
        );

        RestTemplate client = new RestTemplate();

        var response = client.getForEntity(
            wireMock.baseUrl() + "/inventory/1",
            String.class
        );

        assertEquals(401, response.getStatusCode().value());
    }
}
