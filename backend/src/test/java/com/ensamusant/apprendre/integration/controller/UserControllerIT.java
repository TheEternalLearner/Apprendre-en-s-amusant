package com.ensamusant.apprendre.integration.controller;

import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.model.Role;
import com.ensamusant.apprendre.model.User;
import com.ensamusant.apprendre.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    public void createUser_ShouldReturnStatus201AndCreateUser() throws Exception {
        // Arrange
        String formJson = "{\"firstName\":\"John\",\"lastName\":\"Doe\", \"password\":\"password\", \"email\":\"john.doe@mail.com\",\"telephone\":\"0680342528\",\"address\":\"3 rue de Paris Valenciennes\"}";

        // Act & Assert
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(formJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.password").value("password"))
                .andExpect(jsonPath("$.email").value("john.doe@mail.com"))
                .andExpect(jsonPath("$.telephone").value("0680342528"))
                .andExpect(jsonPath("$.address").value("3 rue de Paris Valenciennes"))
                .andExpect(jsonPath("$.role").value("USER"))
                .andExpect(jsonPath("$.id").exists());

    }

    @Test
    public void getAllUser_ShouldReturnStatus200AndEmptyArray() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void getUserById_ShouldReturnStatus200IfIdExists() throws Exception {
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@mail.com");
        user.setTelephone("0680342465");
        user.setAddress("3 rue de Paris, Valenciennes");
        user.setRole(Role.USER);
        userRepository.save(user);

        // Act & Assert
        mockMvc.perform(get("/api/users/" + user.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.password").value("password"))
                .andExpect(jsonPath("$.email").value("john.doe@mail.com"))
                .andExpect(jsonPath("$.telephone").value("0680342465"))
                .andExpect(jsonPath("$.address").value("3 rue de Paris, Valenciennes"))
                .andExpect(jsonPath("$.role").value("USER"));
    }


    @Test
    public void getUserById_ShouldReturnStatus404IfIdDoesNotExist() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/users/999" ))
                .andExpect(status().isNotFound());
    }

    @Test
    public void editUser_ShouldReturnStatus200AndUpdateUserCorrectly() throws Exception {
        // Arrange
        String formJson = "{\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"password\":\"password\",\"email\":\"jane.doe@mail.com\",\"telephone\":\"0680342449\",\"address\":\"3 rue de Paris, Valenciennes\"}";
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("newPassword");
        user.setEmail("john.doe@mail.com");
        user.setTelephone("0680342465");
        user.setAddress("3 rue de Paris, Valenciennes");
        user.setRole(Role.USER);
        userRepository.save(user);

        // Act & Assert
        mockMvc.perform(put("/api/users/" + user.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(formJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstName").value("Jane"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
                .andExpect(jsonPath("$.password").value("newPassword"))
                .andExpect(jsonPath("$.email").value("jane.doe@mail.com"))
                .andExpect(jsonPath("$.telephone").value("0680342449"))
                .andExpect(jsonPath("$.address").value("3 rue de Paris, Valenciennes"))
                .andExpect(jsonPath("$.role").value("USER"));
    }

    @Test
    public void deleteCourse_ShouldReturnStatus200AndDeleteCourse() throws Exception {
        // Arrange
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPassword("password");
        user.setEmail("john.doe@mail.com");
        user.setTelephone("0680342465");
        user.setAddress("3 rue de Paris, Valenciennes");
        user.setRole(Role.USER);
        userRepository.save(user);

        // Act & Assert
        mockMvc.perform(delete("/api/users/" + user.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/users" + user.getId()))
                .andExpect(status().isNotFound());
    }

    @AfterEach
    public void cleanUp() {
        userRepository.deleteAll();
    }
}
