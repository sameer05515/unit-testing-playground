package com.example;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class UserIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void cleanDatabase() {
        userRepository.deleteAll();
    }

    private String url(String path) {
        return "http://localhost:" + port + path;
    }

    @Test
    void shouldCreateAndFetchUserThroughFullApplication() {

        User request = new User(
                null,
                "Prem",
                "prem@example.com"
        );

        ResponseEntity<User> createResponse =
                restTemplate.postForEntity(
                        url("/api/users"),
                        request,
                        User.class
                );

        assertEquals(
                HttpStatus.CREATED,
                createResponse.getStatusCode()
        );

        assertNotNull(createResponse.getBody());
        assertNotNull(createResponse.getBody().getId());

        Long id = createResponse.getBody().getId();

        ResponseEntity<User> getResponse =
                restTemplate.getForEntity(
                        url("/api/users/" + id),
                        User.class
                );

        assertEquals(
                HttpStatus.OK,
                getResponse.getStatusCode()
        );

        assertNotNull(getResponse.getBody());
        assertEquals("Prem", getResponse.getBody().getName());
        assertEquals(
                "prem@example.com",
                getResponse.getBody().getEmail()
        );
    }

    @Test
    void shouldDeleteUserThroughFullApplication() {

        User saved = userRepository.save(
                new User(
                        null,
                        "Prem",
                        "prem@example.com"
                )
        );

        restTemplate.delete(
                url("/api/users/" + saved.getId())
        );

        ResponseEntity<User> response =
                restTemplate.getForEntity(
                        url("/api/users/" + saved.getId()),
                        User.class
                );

        assertEquals(
                HttpStatus.INTERNAL_SERVER_ERROR,
                response.getStatusCode()
        );
    }

    @Test
    void shouldReturnNotFoundAsServerErrorForUnknownUser() {

        ResponseEntity<User> response =
                restTemplate.getForEntity(
                        url("/api/users/99999"),
                        User.class
                );

        assertEquals(
                HttpStatus.INTERNAL_SERVER_ERROR,
                response.getStatusCode()
        );
    }
}
