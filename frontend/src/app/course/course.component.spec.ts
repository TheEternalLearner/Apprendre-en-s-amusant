import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CourseComponent } from './course.component';
import { Course } from '../models/course.model';

describe('CourseComponent', () => {
  let component: CourseComponent;
  let fixture: ComponentFixture<CourseComponent>;
  let router: Router;

  const mockCourse = new Course(
      1,
      'Test Title',
      'Test Description',
      'image.jpg',
      20,
      'Avancé',
      '10-12 ans'
    );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    component.course = mockCourse; // ⚠️ injecter le @Input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on onViewCourse', () => {
    const spy = spyOn(router, 'navigateByUrl');
    component.onViewCourse();
    expect(spy).toHaveBeenCalledWith(`/${mockCourse.id}`);
  });

  it('should truncate text correctly', () => {
    const shortText = 'Hello';
    const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    expect(component.truncate(shortText, 10)).toBe(shortText);
    expect(component.truncate(longText, 10)).toBe('Lorem ipsu…');
  });
});
