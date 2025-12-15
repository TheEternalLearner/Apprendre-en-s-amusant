package com.ensamusant.apprendre.integration.controller;

import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.repository.CourseRepository;
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
        String formJson = "{\"title\":\"English Course\",\"capacity\": 10,\"level\":\"Beginner\",\"dayOfWeek\":\"Monday\",\"timeSlot\":\"14:00-16:00\",\"location\":\"Room 101\"}";

        // Act & Assert
        mockMvc.perform(post("/api/courses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(formJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("English Course"))
                .andExpect(jsonPath("$.capacity").value(10))
                .andExpect(jsonPath("$.level").value("Beginner"))
                .andExpect(jsonPath("$.dayOfWeek").value("Monday"))
                .andExpect(jsonPath("$.timeSlot").value("14:00-16:00"))
                .andExpect(jsonPath("$.location").value("Room 101"))
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
        course.setTitle("Enfant 12-14");
        course.setCapacity(15);
        course.setLevel("Intermediate");
        course.setDayOfWeek("Tuesday");
        course.setTimeSlot("10:00-12:00");
        course.setLocation("Visio");
        courseRepository.save(course);


        // Act & Assert
        mockMvc.perform(get("/api/courses/" + course.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(course.getId()))
                .andExpect(jsonPath("$.title").value("Enfant 12-14"));
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
        course.setTitle("Adult course");
        course.setCapacity(20);
        course.setLevel("Advanced");
        course.setDayOfWeek("Thursday");
        course.setTimeSlot("15:00-17:00");
        course.setLocation("La Sentinelle");
        courseRepository.save(course);

        String formJson = "{\"title\":\"Adult course\",\"capacity\": 20,\"level\":\"Advanced\",\"dayOfWeek\":\"Thursday\",\"timeSlot\":\"15:00-17:00\",\"location\":\"La Sentinelle\"}";

        // Act & Assert
        mockMvc.perform(put("/api/courses/" + course.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(formJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Adult course"))
                .andExpect(jsonPath("$.capacity").value(20))
                .andExpect(jsonPath("$.level").value("Advanced"))
                .andExpect(jsonPath("$.dayOfWeek").value("Thursday"))
                .andExpect(jsonPath("$.timeSlot").value("15:00-17:00"))
                .andExpect(jsonPath("$.location").value("La Sentinelle"));

    }

    @Test
    public void deleteCourse_ShouldReturnStatus200AndDeleteCourse() throws Exception {
        // Arrange
        Course course = new Course();
        course.setTitle("Course to Delete");
        course.setCapacity(8);
        course.setLevel("Beginner");
        course.setDayOfWeek("Friday");
        course.setTimeSlot("13:00-15:00");
        course.setLocation("Room 505");
        courseRepository.save(course);

        // Act & Assert
        mockMvc.perform(delete("/api/courses/" + course.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/courses/" + course.getId()))
                .andExpect(status().isNotFound());
    }

    @AfterEach
    public void cleanUp() {
        courseRepository.deleteAll();
    }
}
