import { TestBed } from '@angular/core/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all courses', () => {
    const courses = service.getCourses();
    expect(courses.length).toBe(3);
    expect(courses[0]).toBeInstanceOf(Course);
  });

  it('should return course by id', () => {
    const allCourses = service.getCourses();
    const course = service.getCourseById(allCourses[0].id);
    expect(course).toEqual(allCourses[0]);
  });

  it('should throw error if course not found', () => {
    expect(() => service.getCourseById('non-existent-id')).toThrowError('Course not found');
  });
});
