package com.sccom.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Aplica essa regra para TODAS as URLs do backend
                .allowedOrigins("http://localhost:5173") // Libera apenas o seu React
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Libera os verbos HTTP
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}