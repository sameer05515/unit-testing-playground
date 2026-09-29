package com.example.inventory;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest
@Import(InventorySecurityConfig.class)
class InventorySecurityTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    JwtDecoder jwtDecoder;

    @Test
    void relayScope_shouldAllowRelayEndpoint() throws Exception {
        mockMvc.perform(
            get("/inventory/relay/1")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "SCOPE_inventory:read"
                    )
                ))
        ).andExpect(status().isOk());
    }

    @Test
    void missingRelayScope_shouldReturn403() throws Exception {
        mockMvc.perform(
            get("/inventory/relay/1")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "SCOPE_other"
                    )
                ))
        ).andExpect(status().isForbidden());
    }

    @Test
    void serviceScope_shouldAllowServiceEndpoint() throws Exception {
        mockMvc.perform(
            get("/inventory/service/1")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "SCOPE_inventory:service"
                    )
                ))
        ).andExpect(status().isOk());
    }

    @Test
    void userScope_shouldNotAccessServiceEndpoint() throws Exception {
        mockMvc.perform(
            get("/inventory/service/1")
                .with(jwt().authorities(
                    new org.springframework.security.core.authority.SimpleGrantedAuthority(
                        "SCOPE_inventory:read"
                    )
                ))
        ).andExpect(status().isForbidden());
    }

    @Test
    void noJwt_shouldReturn401() throws Exception {
        mockMvc.perform(
            get("/inventory/service/1")
        ).andExpect(status().isUnauthorized());
    }
}
