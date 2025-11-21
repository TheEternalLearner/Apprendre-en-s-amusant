package com.ensamusant.apprendre;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Map;
import java.util.stream.Collectors;

@SpringBootApplication
public class ApprendreEnSAmusantApplication {

	public static void main(String[] args) {

        // getting variables from .env
        Dotenv dotenv = Dotenv.configure().ignoreIfMalformed().load();

        // Converting variables to PropertySource for Spring
        Map<String, Object> map = dotenv.entries().stream()
                .collect(Collectors.toMap(entry -> entry.getKey(), entry -> entry.getValue()));

        // Start application with correct properties
        SpringApplication app = new SpringApplication(ApprendreEnSAmusantApplication.class);
        app.setDefaultProperties(map);
        app.run(args);
	}

}
