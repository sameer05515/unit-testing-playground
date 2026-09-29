package com.example.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class GatewaySecurityConfig {

    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        http.csrf(c -> c.disable())
            .sessionManagement(s ->
                s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a -> a
                .requestMatchers("/gateway/public").permitAll()
                .requestMatchers("/gateway/orders/**").authenticated()
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt(
                j -> j.jwtAuthenticationConverter(converter())));
        return http.build();
    }

    @Bean
    JwtAuthenticationConverter converter() {
        return new JwtAuthenticationConverter();
    }
}
