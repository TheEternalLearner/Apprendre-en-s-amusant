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
}
