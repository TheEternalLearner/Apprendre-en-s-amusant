import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-course-form',
  imports: [FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private courseService = inject(CourseService);
  private snackBar = inject(MatSnackBar);

  course!: Course;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.course = new Course(0, '', null, '', '', '', '');
      this.courseService.getCourseById(+id).subscribe({
        next: (course) => {
          this.course = course;
        },
        error: (err) => {
          console.error('Error loading course:', err);
        }
      });
    } else {
      this.course = new Course(0, '', null, '', '', '', '');
    }
    
  }

  onSubmit(form:NgForm) {
    if (form.invalid) {
      this.snackBar.open('Veuillez remplir tous les champs correctement.', 'OK', {
        duration: 3000,
        panelClass: ['snack-error']
      });
      return;
    }

    if (this.course.id) {
      this.courseService.editCourse(this.course).subscribe({
        next: () => {
          this.router.navigate(['/admin/cours']);
          this.snackBar.open('Cours modifié avec succès', 'OK', {
            duration: 3000,
            panelClass: ['snack-success']
          });
        },
        error: (err) => {
          this.snackBar.open('Erreur lors de la modification du cours', 'OK', {
            duration: 3000,
            panelClass: ['snack-error']
          });
          console.error('Erreur d\'édition:', err);
        }
      });
    } else {
      this.courseService.createCourse(this.course).subscribe({
        next: () => {
          this.router.navigate(['/admin/cours']);
           this.snackBar.open('Cours créé avec succès', 'OK', {
            duration: 3000,
            panelClass: ['snack-success']
          });
        },
        error: () => {
          this.snackBar.open('Erreur lors de la création du cours', 'OK', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
      });
    }
  }

}
