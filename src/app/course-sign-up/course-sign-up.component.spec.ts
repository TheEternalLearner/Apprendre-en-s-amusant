import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSignUpComponent } from './course-sign-up.component';

describe('CourseSignUpComponent', () => {
  let component: CourseSignUpComponent;
  let fixture: ComponentFixture<CourseSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSignUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
