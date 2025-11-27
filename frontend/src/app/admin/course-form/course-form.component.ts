import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

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

  course!: Course;

  formData = {
    title: '',
    capacity: 0,
    level: '',
    dayOfTheWeek: '',
    timeSlot: '',
    location: ''
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.courseService.getCourseById(+id).subscribe({
        next: (course) => {
          this.course = course;
        },
        error: (err) => {
          console.error('Error loading course:', err);
        }
      });
    }
    
  }

  onSubmit(form:NgForm) {
    if (this.course.id) {
      this.courseService.editCourse(this.course).subscribe({
        next: () => {
          this.router.navigate(['/admin/cours']);
        },
        error: (err) => console.error('Erreur d\'édition:', err)
      });
    } else {
      this.courseService.createCourse(this.course).subscribe({
        next: () => {
          this.router.navigate(['/admin/cours']);
        },
        error: (err) => console.error('Erreur de création:', err)
      });
    }
  }

}
