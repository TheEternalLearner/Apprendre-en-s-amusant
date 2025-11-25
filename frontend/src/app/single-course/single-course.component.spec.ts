import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SingleCourseComponent } from './single-course.component';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';
import { of } from 'rxjs';

const fakeCourse = new Course(
  1,
  'Cours de test',
  15,
  'Débutant',
  'Lundi',
  '14:00-16:00',
  'La Sentinelle'
);

const fakeCourseService = {
  getCourseById: (id: number) => of(fakeCourse)
};

const fakeActivatedRoute = {
  snapshot: {
    params: { id: 1 }
  }
};


describe('SingleCourseComponent', () => {
  let component: SingleCourseComponent;
  let fixture: ComponentFixture<SingleCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCourseComponent],
      providers:[
        { provide: CourseService, useValue: fakeCourseService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the course with id 1', () => {
    expect(component.course).toEqual(fakeCourse);
    expect(component.course.title).toBe('Cours de test');
    expect(component.course.level).toBe('Débutant');
  });

  it('should call getCourseById with correct id from route', () => {
    spyOn(fakeCourseService, 'getCourseById').and.returnValue(of(fakeCourse));
    component.ngOnInit();
    expect(fakeCourseService.getCourseById).toHaveBeenCalledWith(1);
  });
});
