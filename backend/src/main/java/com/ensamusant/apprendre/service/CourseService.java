package com.ensamusant.apprendre.service;

import com.ensamusant.apprendre.model.Course;
import com.ensamusant.apprendre.repository.CourseRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Data
@Service
public class CourseService {

    @Autowired
    private final CourseRepository courseRepository;

    public Optional<Course> getCourse(final Long id) { return courseRepository.findById(id);}

    public Iterable<Course> getCourses() { return courseRepository.findAll() ;}

    public Course saveCourse(Course course) {
        Course savedCourse = courseRepository.save(course);
        return savedCourse;
    }

    public void deleteCourse(final Long id) {courseRepository.deleteById(id);}
}
