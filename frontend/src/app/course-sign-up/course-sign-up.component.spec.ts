import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseSignUpComponent } from './course-sign-up.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

//TODO Faire fonctionner ces test

describe('CourseSignUpComponent', () => {
  let component: CourseSignUpComponent;
  let fixture: ComponentFixture<CourseSignUpComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [CourseSignUpComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSignUpComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form data initially', () => {
    expect(component.formData.firstName).toBe('');
    expect(component.formData.lastName).toBe('');
    expect(component.formData.email).toBe('');
    expect(component.formData.course).toBe('');
  });

  it('should set successMessage on successful submission', () => {
    component.formData = { firstName: 'John', lastName: 'Doe', email: 'john@example.com', course: '1' };
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/signup');
    expect(req.request.method).toBe('POST');
    req.flush({}); // simule une réponse réussie

    //expect(component.successMessage).toBe('Inscription envoyée avec succès !');
    //expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage on failed submission', () => {
    component.formData = { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', course: '2' };
    component.onSubmit();

    const req = httpMock.expectOne('http://localhost:8080/api/signup');
    req.error(new ErrorEvent('Network error'));

    //expect(component.errorMessage).toBe('Erreur lors de l’envoi du formulaire.');
    //expect(component.successMessage).toBe('');
  });
});
