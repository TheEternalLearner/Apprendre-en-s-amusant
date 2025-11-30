package com.ensamusant.apprendre.config;

import com.ensamusant.apprendre.model.Role;
import com.ensamusant.apprendre.model.User;
import com.ensamusant.apprendre.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.findByRole(Role.ADMIN).isEmpty()) {
            User admin = new User();
            admin.setFirstName("Admin");
            admin.setLastName("Root");
            admin.setEmail("admin@mail.com");
            admin.setPassword("password");
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        }
    }
}