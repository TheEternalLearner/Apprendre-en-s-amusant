package com.ensamusant.apprendre.integration.controller;

import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.repository.CourseRepository;
import com.ensamusant.apprendre.service.CourseService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CourseControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CourseRepository courseRepository;

    @Test
    public void createCourse_ShouldReturnStatus201AndCreateCourse() throws Exception {
        // Arrange
        String formJson = "{\"title\":\"title\",\"description\":\"description\",\"imageUrl\":\"image.jpeg\",\"capacity\": 4,\"level\":\"beginner\",\"ageBracket\":\"6-8\"}";

        // Act & Assert
        mockMvc.perform(post("/api/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(formJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("title"))
                .andExpect(jsonPath("$.description"). value("description"))
                .andExpect(jsonPath("$.imageUrl").value("image.jpeg"))
                .andExpect(jsonPath("$.capacity").value(4))
                .andExpect(jsonPath("$.level").value("beginner"))
                .andExpect(jsonPath("$.ageBracket").value("6-8"))
                .andExpect(jsonPath("$.id").exists());
    }

    @Test
    public void getAllCourses_ShouldReturnStatus200AndEmptyArray() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/courses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void getCourseById_ShouldReturnStatus200IfIdExists() throws Exception {
        // Arrange
        Course course = new Course();
        course.setTitle("title");
        course.setDescription("description");
        course.setImageUrl("image.jpeg");
        course.setCapacity(3);
        course.setLevel("Beginner");
        course.setAgeBracket("12-14");
        courseRepository.save(course);


        // Act & Assert
        mockMvc.perform(get("/api/courses/" + course.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(course.getId()))
                .andExpect(jsonPath("$.title").value("title"));
    }


    @Test
    public void getCourseById_ShouldReturnStatus404IfIdDoesNotExist() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/courses/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void updateCourse_ShouldReturnStatus200AndUpdateCourseCorrectly() throws Exception {
        // Arrange
        Course course = new Course();
        course.setTitle("title");
        course.setDescription("description");
        course.setImageUrl("image.jpeg");
        course.setCapacity(3);
        course.setLevel("Beginner");
        course.setAgeBracket("12-14");
        courseRepository.save(course);

        String formJson = "{\"title\":\"new title\",\"description\":\"updated description\",\"imageUrl\":\"image2.png\",\"capacity\": 8,\"level\":\"Intermediate\",\"ageBracket\":\"6-8\"}";

        // Act & Assert
        mockMvc.perform(put("/api/courses/" + course.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(formJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("new title"))
                .andExpect(jsonPath("$.description").value("updated description"))
                .andExpect(jsonPath("$.imageUrl").value("image2.png"))
                .andExpect(jsonPath("$.capacity").value(8))
                .andExpect(jsonPath("$.level").value("Intermediate"))
                .andExpect(jsonPath("$.ageBracket").value("6-8"));

    }

    @Test
    public void deleteCourse_ShouldReturnStatus200AndDeleteCourse() throws Exception {
        // Arrange
        Course course = new Course();
        course.setTitle("title");
        course.setDescription("description");
        course.setImageUrl("image.jpeg");
        course.setCapacity(3);
        course.setLevel("Beginner");
        course.setAgeBracket("12-14");
        courseRepository.save(course);

        // Act & Assert
        mockMvc.perform(delete("/api/courses/" + course.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());
    }

    @AfterEach
    public void cleanUp() {
        courseRepository.deleteAll();
    }
}
