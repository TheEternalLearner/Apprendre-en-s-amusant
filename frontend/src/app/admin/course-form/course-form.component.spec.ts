import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormComponent } from './course-form.component';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('CourseFormComponent', () => {
  let component: CourseFormComponent;
  let fixture: ComponentFixture<CourseFormComponent>;
  let mockCourseService: jasmine.SpyObj<CourseService>;
  let mockRouter: any;

  beforeEach(async () => {
    mockCourseService = jasmine.createSpyObj('CourseService', ['getCourseById', 'createCourse', 'updateCourse']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CourseFormComponent],
      providers: [
        { provide: CourseService, useValue: mockCourseService },
        { provide: Router, useValue: mockRouter}
      ]
    }).compileComponents();

   
  });

  it('course attribut should be undefined when in create mode when no id in route', () => {
    // Arrange
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { paramMap: { get: () => null}}}
    });

    // Act
    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Assert
    expect(component.course).toBeUndefined();
  })

  it('course attribut should be defined in edit mode when id is in route', () => {
    
    const mockCourse = new Course(1, 'Test Title', 20, 'Avancé', 'Lundi', '14:00-16:00', 'Visio');
    mockCourseService.getCourseById.and.returnValue(of(mockCourse));
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { paramMap: { get: (key: string) => key === 'id' ? '1' : null }}}
    });

    fixture = TestBed.createComponent(CourseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.course).toEqual(mockCourse);
    expect(mockCourseService.getCourseById).toHaveBeenCalledWith(1);
  })

  it('should call createCouse when submitting in create mode', () => {
    const mockForm = {} as NgForm;
    const newCourse = new Course(0, 'New Course', 15, 'Débutant', 'Mardi', '10:00-12:00', 'La Sentinelle');
    mockCourseService.createCourse.and.returnValue(of(newCourse));
    component.course = newCourse;

    component.onSubmit(mockForm);

    expect(mockCourseService.createCourse).toHaveBeenCalledWith(newCourse);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/courses']);
  })

  it('should call editCourse when submitting in edit mode', () => {
    const mockForm = {} as NgForm;
    const existingCourse = new Course(2, 'Existing Course', 25, 'Intermédiaire', 'Mercredi', '14:00-16:00', 'Visio');
    mockCourseService.editCourse.and.returnValue(of(existingCourse));
    component.course = existingCourse;

    component.onSubmit(mockForm);

    expect(mockCourseService.editCourse).toHaveBeenCalledWith(existingCourse);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/courses']);
  })
});
