import { Component, inject } from '@angular/core';
import { Course } from '../../models/course.model';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-course-list',
  imports: [],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class AdminCourseListComponent {
  courses!: Course[];
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private courseService = inject(CourseService);

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (error) => {
        console.error('Error while loading courses:', error);
        this.snackBar.open('Erreur lors du chargement des cours', 'Fermer', { duration: 4000, panelClass: ['snackbar-error'] });
      }
    })    
  }

  onCreate(): void {
    this.router.navigate(['/admin/cours/nouveau']);
  }

  onEdit(courseId: number): void {
    this.router.navigate([`/admin/cours/${courseId}/edit`]);
  }

  onDelete(courseId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      this.courseService.deleteCourse(courseId).subscribe({
        next: () => {
          console.log('Cours supprimé avec succès');
          // Reload courses
          this.ngOnInit();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression du cours', 'Fermer', { duration: 4000, panelClass: ['snackbar-error'] });
        }
      });
    }
  }
}
