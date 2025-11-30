package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.Role;
import com.ensamusant.apprendre.model.User;
import com.ensamusant.apprendre.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<User> createUser(@Valid @RequestBody User newUser) {
        newUser.setId(null);
        newUser.setRole(Role.USER);
        User savedUser = userService.editUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping("")
    public Iterable<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id ) {
        Optional<User> user = userService.getUser(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> editUser(@PathVariable("id") Long id, @Valid @RequestBody User newUser ) {
        Optional<User> user = userService.getUser(id);
        if (user.isPresent()) {
            User currentUser = user.get();
            String newFirstName = newUser.getFirstName();
            if (newFirstName != "") {
                currentUser.setFirstName(newFirstName);
            }
            String newLastName = newUser.getLastName();
            if (newLastName != "") {
                currentUser.setLastName(newLastName);
            }
            String newEmail = newUser.getEmail();
            if (newEmail != "") {
                currentUser.setEmail(newEmail);
            }
            String newTelephone = newUser.getTelephone();
            if (newTelephone != "") {
                currentUser.setTelephone(newTelephone);
            }
            String newAddress = newUser.getAddress();
            if (newAddress != "") {
                currentUser.setAddress(newAddress);
            }
            userService.editUser(currentUser);
            return ResponseEntity.ok(currentUser);
        }
        return ResponseEntity.notFound().build();

    }
}
