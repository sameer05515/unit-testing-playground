package com.example.order;

import com.github.tomakehurst.wiremock.WireMockServer;
import org.junit.jupiter.api.*;
import org.springframework.web.client.RestTemplate;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.junit.jupiter.api.Assertions.*;

class ClientCredentialsWireMockTest {

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
    void serviceToken_shouldBeDifferentFromUserTokenConceptually() {
        String userToken = "user-jwt";
        String serviceToken = "order-service-jwt";

        assertNotEquals(userToken, serviceToken);
    }

    @Test
    void serviceToken_shouldBeSentAsBearerToken() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/service/1"))
                .withHeader(
                    "Authorization",
                    equalTo("Bearer order-service-jwt")
                )
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withBody("inventory-service-1")
                )
        );

        RestTemplate client = new RestTemplate();

        org.springframework.http.HttpHeaders headers =
            new org.springframework.http.HttpHeaders();
        headers.setBearerAuth("order-service-jwt");

        var response = client.exchange(
            wireMock.baseUrl() + "/inventory/service/1",
            org.springframework.http.HttpMethod.GET,
            new org.springframework.http.HttpEntity<>(headers),
            String.class
        );

        assertEquals(
            "inventory-service-1",
            response.getBody()
        );

        wireMock.verify(
            getRequestedFor(urlEqualTo("/inventory/service/1"))
                .withHeader(
                    "Authorization",
                    equalTo("Bearer order-service-jwt")
                )
        );
    }

    @Test
    void serviceWithoutRequiredScope_shouldReceive403Contract() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/service/1"))
                .willReturn(aResponse().withStatus(403))
        );

        RestTemplate client = new RestTemplate();

        var response = client.getForEntity(
            wireMock.baseUrl() + "/inventory/service/1",
            String.class
        );

        assertEquals(403, response.getStatusCode().value());
    }
}
