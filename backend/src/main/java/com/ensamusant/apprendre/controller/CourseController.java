package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.service.CourseService;
import jakarta.validation.Valid;
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
    public ResponseEntity<Course> createCourse(@Valid @RequestBody Course newCourse) {
        newCourse.setId(null); // removing id to force new id creation
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
    public ResponseEntity<Course> updateCourse(@PathVariable("id") Long id, @Valid @RequestBody Course newCourse) {
        Optional<Course> course = courseService.getCourse(id);
        if (course.isPresent()) {
            Course savedCourse = course.get();
            String newTitle = newCourse.getTitle();
            if (newTitle != null && !newTitle.isEmpty()) {
                savedCourse.setTitle(newTitle);
            }
            Integer newCapacity = newCourse.getCapacity();
            if (newCapacity != null && newCapacity > 0) {
                savedCourse.setCapacity(newCapacity);
            }
            String newLevel = newCourse.getLevel();
            if (newLevel != null && !newLevel.isEmpty()) {
                savedCourse.setLevel(newLevel);
            }
            String newDayOfWeek = newCourse.getDayOfWeek();
            if (newDayOfWeek != null && !newDayOfWeek.isEmpty()) {
                savedCourse.setDayOfWeek(newDayOfWeek);
            }
            String newTimeSlot = newCourse.getTimeSlot();
            if (newTimeSlot != null && !newTimeSlot.isEmpty()) {
                savedCourse.setTimeSlot(newTimeSlot);
            }
            String newLocation = newCourse.getLocation();
            if (newLocation != null && !newLocation.isEmpty()) {
                savedCourse.setLocation(newLocation);
            }
            courseService.saveCourse(savedCourse);
            return ResponseEntity.ok(savedCourse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable("id") Long id) {
        Optional<Course> deletedCourse = courseService.getCourse(id);
        if (deletedCourse.isPresent()) {
            courseService.deleteCourse(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
