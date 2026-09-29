package com.example.order;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class OrderSecurityConfig {

    @Bean
    SecurityFilterChain security(HttpSecurity http) throws Exception {
        http.csrf(c -> c.disable())
            .sessionManagement(s ->
                s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a -> a
                .requestMatchers("/orders/health").permitAll()
                .requestMatchers("/orders/**").authenticated()
                .anyRequest().authenticated())
            .oauth2ResourceServer(o -> o.jwt());

        return http.build();
    }
}
