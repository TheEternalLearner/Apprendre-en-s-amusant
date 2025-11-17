import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SingleCourseComponent } from './single-course.component';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

const fakeCourse = new Course(
  'Cours de test',
  'Description de test',
  'test.jpg',
  15,
  'Débutant',
  '6-9 ans'
);

const fakeCourseService = {
  getCourseById: (id: string) => fakeCourse
};

const fakeActivatedRoute = {
  snapshot: {
    params: { id: '1' }
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
    expect(component.course.description).toBe('Description de test');
  });

  it('should call getCourseById with correct id from route', () => {
    spyOn(fakeCourseService, 'getCourseById').and.returnValue(fakeCourse);
    component.ngOnInit();
    expect(fakeCourseService.getCourseById).toHaveBeenCalledWith('1');
  });
});
