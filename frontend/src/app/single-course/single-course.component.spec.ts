import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCourseComponent } from './single-course.component';
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
  getCourseById: (id: number) => fakeCourse
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
        {provide: 'CourseService', useValue: 'fakeCourseService'},
        {provide: 'ActivatedRoute', useValue: 'fakeActivatedRoute'}
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
  });

  it('should display course title in the template', () => {
    expect(component.course.title).toBe('Cours de test');
  });
});
