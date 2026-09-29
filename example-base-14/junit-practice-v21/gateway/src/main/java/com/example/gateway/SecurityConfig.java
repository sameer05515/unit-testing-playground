package com.example.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.Map;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        http.csrf(c -> c.disable())
            .sessionManagement(s ->
                s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a -> a
                .requestMatchers("/gateway/public").permitAll()
                .requestMatchers("/gateway/admin/**").hasRole("ADMIN")
                .requestMatchers("/gateway/orders/**")
                    .hasAuthority("SCOPE_orders:read")
                .requestMatchers("/gateway/**").authenticated()
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt(
                j -> j.jwtAuthenticationConverter(converter())));
        return http.build();
    }

    @Bean
    JwtAuthenticationConverter converter() {
        JwtAuthenticationConverter converter =
            new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            java.util.ArrayList<SimpleGrantedAuthority> result =
                new java.util.ArrayList<>();

            Object realm = jwt.getClaims().get("realm_access");
            if (realm instanceof Map<?, ?> map) {
                Object roles = map.get("roles");
                if (roles instanceof Collection<?> values) {
                    values.forEach(v -> {
                        String role = v.toString();
                        result.add(new SimpleGrantedAuthority(
                            role.startsWith("ROLE_")
                                ? role
                                : "ROLE_" + role));
                    });
                }
            }

            Object scope = jwt.getClaims().get("scope");
            if (scope instanceof String scopes) {
                for (String s : scopes.split(" ")) {
                    if (!s.isBlank()) {
                        result.add(new SimpleGrantedAuthority("SCOPE_" + s));
                    }
                }
            }
            return result;
        });
        return converter;
    }
}
