package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Collection;
import java.util.Map;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/orders/**")
                    .hasAuthority("SCOPE_orders:read")
                .requestMatchers("/api/service/**")
                    .hasAuthority("SCOPE_service:read")
                .requestMatchers("/api/users/**").authenticated()
                .requestMatchers("/api/me").authenticated()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(keycloakConverter()))
            );

        return http.build();
    }

    @Bean
    JwtAuthenticationConverter keycloakConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            java.util.ArrayList<SimpleGrantedAuthority> authorities =
                new java.util.ArrayList<>();

            Object realmAccess = jwt.getClaims().get("realm_access");

            if (realmAccess instanceof Map<?, ?> realmMap) {
                Object roles = realmMap.get("roles");

                if (roles instanceof Collection<?> rolesCollection) {
                    rolesCollection.forEach(role -> {
                        String roleName = role.toString();
                        if (!roleName.startsWith("ROLE_")) {
                            roleName = "ROLE_" + roleName;
                        }
                        authorities.add(
                            new SimpleGrantedAuthority(roleName)
                        );
                    });
                }
            }

            Object scope = jwt.getClaims().get("scope");

            if (scope instanceof String scopeString) {
                for (String item : scopeString.split(" ")) {
                    if (!item.isBlank()) {
                        authorities.add(
                            new SimpleGrantedAuthority("SCOPE_" + item)
                        );
                    }
                }
            }

            if (scope instanceof Collection<?> scopes) {
                scopes.forEach(item ->
                    authorities.add(
                        new SimpleGrantedAuthority("SCOPE_" + item)
                    )
                );
            }

            return authorities;
        });

        return converter;
    }
}
