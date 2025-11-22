package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("")
    public ResponseEntity<Course> createCourse(@RequestBody Course newCourse) {
        Course savedCourse = courseService.saveCourse(newCourse);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
    }

    @GetMapping("")
    public Iterable<Course> getCourses() {
        return courseService.getCourses();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable("id") Long id) {
        Optional<Course> course = courseService.getCourse(id);
        if (course.isPresent()) {
            return ResponseEntity.ok(course.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable("id") Long id, @RequestBody Course newCourse) {
        Optional<Course> course = courseService.getCourse(id);
        if (course.isPresent()) {
            Course savedCourse = course.get();
            String newTitle = newCourse.getTitle();
            if (newTitle != null && !newTitle.isEmpty()) {
                savedCourse.setTitle(newTitle);
            }
            String newDescription = newCourse.getDescription();
            if (newDescription != null && !newDescription.isEmpty()) {
                savedCourse.setDescription(newDescription);
            }
            String newImageUrl = newCourse.getImageUrl();
            if (newImageUrl != null && !newImageUrl.isEmpty()) {
                savedCourse.setImageUrl(newImageUrl);
            }
            Integer newCapacity = newCourse.getCapacity();
            if (newCapacity > 0) {
                savedCourse.setCapacity(newCapacity);
            }
            String newLevel = newCourse.getLevel();
            if (newLevel != null && !newLevel.isEmpty()) {
                savedCourse.setLevel(newLevel);
            }
            String newAgeBracket = newCourse.getAgeBracket();
            if (newAgeBracket != null && !newAgeBracket.isEmpty()) {
                savedCourse.setAgeBracket(newAgeBracket);
            }
            courseService.saveCourse(savedCourse);
            return ResponseEntity.ok(savedCourse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
