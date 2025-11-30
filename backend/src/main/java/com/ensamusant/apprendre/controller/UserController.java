package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.Role;
import com.ensamusant.apprendre.model.User;
import com.ensamusant.apprendre.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Iterable <User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public Optional<User> getUserById(@PathVariable("id") Long id ) {
        return userService.getUser(id);
    }
}
