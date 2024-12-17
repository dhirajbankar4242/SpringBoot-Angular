package com.prime.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String[] allowedMethods = {"GET", "POST", "PUT", "PATCH", "DELETE"};
    @Override
    public void addCorsMappings(CorsRegistry registry) {

        registry.addMapping("/**").allowedOrigins("*").allowedMethods(allowedMethods);

        WebMvcConfigurer.super.addCorsMappings(registry);
    }

}
