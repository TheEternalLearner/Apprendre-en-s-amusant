// course-sign-up.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-sign-up',
  templateUrl: './course-sign-up.component.html',
  imports: [FormsModule],
  styleUrls: ['./course-sign-up.component.css']
})
export class CourseSignUpComponent {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    course: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:8080/api/signup', this.formData)
      .subscribe({
        next: () => {
          this.successMessage = 'Inscription envoyée avec succès !';
          this.errorMessage = '';
        },
        error: () => {
          this.errorMessage = 'Erreur lors de l’envoi du formulaire.';
          this.successMessage = '';
        }
      });
  }
}
