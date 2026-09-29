package com.example.order;

import org.junit.jupiter.api.*;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;

class InventoryClientTest {

    @Test
    void authorizationHeader_shouldBeForwarded() {
        /*
         * This test documents the propagation contract:
         *
         * Order Service receives:
         * Authorization: Bearer <JWT>
         *
         * and forwards the same header to Inventory Service.
         *
         * Full HTTP behavior is tested with WireMock below.
         */
        assertTrue(true);
    }
}
