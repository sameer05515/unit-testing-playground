package com.example.order;

import com.github.tomakehurst.wiremock.WireMockServer;
import org.junit.jupiter.api.*;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import static com.github.tomakehurst.wiremock.client.WireMock.*;
import static org.junit.jupiter.api.Assertions.*;

class OrderInventoryWireMockTest {

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
    void downstreamSuccess_shouldReturnInventoryResponse() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/1"))
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withBody("inventory-1")
                )
        );

        RestTemplate client = new RestTemplate();

        String result = client.getForObject(
            wireMock.baseUrl() + "/inventory/1",
            String.class
        );

        assertEquals("inventory-1", result);

        wireMock.verify(
            getRequestedFor(urlEqualTo("/inventory/1"))
        );
    }

    @Test
    void downstream500_shouldRaiseServerError() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/1"))
                .willReturn(
                    aResponse().withStatus(500)
                )
        );

        RestTemplate client = new RestTemplate();

        assertThrows(
            HttpServerErrorException.class,
            () -> client.getForObject(
                wireMock.baseUrl() + "/inventory/1",
                String.class
            )
        );
    }

    @Test
    void downstream401_shouldRaiseUnauthorized() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/1"))
                .willReturn(
                    aResponse().withStatus(401)
                )
        );

        RestTemplate client = new RestTemplate();

        Exception exception = assertThrows(
            Exception.class,
            () -> client.getForObject(
                wireMock.baseUrl() + "/inventory/1",
                String.class
            )
        );

        assertTrue(
            exception.getMessage().contains("401")
        );
    }

    @Test
    void downstream_shouldReceiveBearerToken() {
        wireMock.stubFor(
            get(urlEqualTo("/inventory/1"))
                .withHeader(
                    "Authorization",
                    equalTo("Bearer test-jwt")
                )
                .willReturn(
                    aResponse()
                        .withStatus(200)
                        .withBody("inventory-1")
                )
        );

        RestTemplate client = new RestTemplate();

        org.springframework.http.HttpHeaders headers =
            new org.springframework.http.HttpHeaders();
        headers.setBearerAuth("test-jwt");

        org.springframework.http.ResponseEntity<String> response =
            client.exchange(
                wireMock.baseUrl() + "/inventory/1",
                org.springframework.http.HttpMethod.GET,
                new org.springframework.http.HttpEntity<>(headers),
                String.class
            );

        assertEquals(200, response.getStatusCode().value());

        wireMock.verify(
            getRequestedFor(urlEqualTo("/inventory/1"))
                .withHeader(
                    "Authorization",
                    equalTo("Bearer test-jwt")
                )
        );
    }
}
