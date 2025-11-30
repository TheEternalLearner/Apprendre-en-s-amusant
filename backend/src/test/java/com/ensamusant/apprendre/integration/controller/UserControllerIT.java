package com.ensamusant.apprendre.integration.controller;

import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.model.Role;
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
        String formJson = "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john.doe@mail.com\",\"telephone\":\"0680342528\",\"address\":\"3 rue de Paris Valenciennes\"}";

        // Act & Assert
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(formJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.firstName").value("John"))
                .andExpect(jsonPath("$.lastName").value("Doe"))
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

    }


    @Test
    public void getUserById_ShouldReturnStatus404IfIdDoesNotExist() throws Exception {

    }

    @Test
    public void updateUser_ShouldReturnStatus200AndUpdateUserCorrectly() throws Exception {

    }

    @Test
    public void deleteCourse_ShouldReturnStatus200AndDeleteCourse() throws Exception {

    }

    @AfterEach
    public void cleanUp() {
        userRepository.deleteAll();
    }
}
