import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseSignUpComponent } from './course-sign-up.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('CourseSignUpComponent', () => {
  let component: CourseSignUpComponent;
  let fixture: ComponentFixture<CourseSignUpComponent>;
  let httpMock: HttpTestingController;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CourseSignUpComponent, FormsModule, HttpClientTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSignUpComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    httpMock.expectOne('http://localhost:8080/api/courses').flush([]);
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
    expect(component.formData.courseId).toBe('');
  });

  it('should show success message on successful submission', () => {
    const mockForm = {
      invalid: false,
      value: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', courseId: '1' }
    } as NgForm;

    component.onSubmit(mockForm);

    const req = httpMock.expectOne('http://localhost:8080/api/signup/submit');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockForm.value);
    req.flush({});

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Inscription envoyée avec succès !',
      'OK',
      jasmine.objectContaining({ duration: 3000 })
    );
  });

  it('should show error message on failed submission', () => {
    const mockForm = {
      invalid: false,
      value: { firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', courseId: '2' }
    } as NgForm;

    component.onSubmit(mockForm);

    const req = httpMock.expectOne('http://localhost:8080/api/signup/submit');
    req.error(new ErrorEvent('Network error'));

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Erreur lors de la soumission du formulaire !',
      'OK',
      jasmine.objectContaining({ duration: 3000 })
    );
  });

  it('should show error message when form is invalid', () => {
    const mockInvalidForm = {
      invalid: true,
      value: {}
    } as NgForm;

    component.onSubmit(mockInvalidForm);

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Veuillez remplir tous les champs correctement.',
      'OK',
      jasmine.objectContaining({ duration: 3000 })
    );
    httpMock.expectNone('http://localhost:8080/api/signup/submit');
  });

  it('should redirect to home page after successful submission', () => {
    const mockForm = {
      invalid: false,
      value: { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', courseId: '3' }
    } as NgForm;

    component.onSubmit(mockForm);

    const req = httpMock.expectOne('http://localhost:8080/api/signup/submit');
    req.flush({});

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });
});
