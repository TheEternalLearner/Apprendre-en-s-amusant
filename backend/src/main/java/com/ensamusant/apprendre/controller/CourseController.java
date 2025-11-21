package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    public CourseController( CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/{id}")
    public void getCourseById(Long id) {

    }
}
