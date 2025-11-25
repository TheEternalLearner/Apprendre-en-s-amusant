import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all courses', () => {
    const mockCourses: Course[] = [
      new Course(1, 'Course 1', 10, 'Débutant', 'Lundi', '10:00-12:00', 'Salle A'),
      new Course(2, 'Course 2', 15, 'Avancé', 'Mardi', '14:00-16:00', 'Salle B')
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should return course by id', () => {
    const mockCourse = new Course(1, 'Course 1', 10, 'Débutant', 'Lundi', '10:00-12:00', 'Salle A');

    service.getCourseById(1).subscribe(course => {
      expect(course).toEqual(mockCourse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/courses/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourse);
  });
});
