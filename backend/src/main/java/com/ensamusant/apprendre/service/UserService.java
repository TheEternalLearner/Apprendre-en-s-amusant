package com.ensamusant.apprendre.service;


import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.model.User;
import com.ensamusant.apprendre.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    public Optional<User> getUser(final Long id) { return userRepository.findById(id);}

    public Iterable<User> getUsers() { return userRepository.findAll() ;}

    public User saveUser(User user) {
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    public void deleteUser(final Long id) { userRepository.deleteById(id);}
}
