// course-sign-up.component.ts
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-sign-up',
  templateUrl: './course-sign-up.component.html',
  imports: [FormsModule],
  styleUrls: ['./course-sign-up.component.css']
})

export class CourseSignUpComponent {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    course: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'OK', {
        duration: 3000,
        panelClass: ['snack-error']
      });
      return;
    }

    this.http.post('http://localhost:8080/api/signup/submit', form.value)
      .subscribe({
        next: () => {
          this.snackBar.open('Inscription envoyée avec succès !', 'OK', {
            duration: 3000,
            panelClass: ['snack-success']
          });
          this.router.navigate(['/']);
        },
        error: () => {
          this.snackBar.open('Erreur lors de la soumission du formulaire !', 'OK', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
    });
    
  }
}
