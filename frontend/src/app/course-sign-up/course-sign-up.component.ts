// course-sign-up.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  onSubmit() {
    this.http.post('http://localhost:8080/api/signup/submit', this.formData)
      .subscribe({
        next: () => {
          this.snackBar.open('Inscription envoyée avec succès !', 'OK', {
            duration: 3000,
            panelClass: ['snack-success']
          });
        },
        error: () => {
          this.snackBar.open('Erreur lors de l\'inscription !', 'OK', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
      });
  }
}
