import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  imports: [FormsModule],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.css'
})
export class CourseFormComponent {
  private router = inject(Router);

  formData = {
    title: '',
    capacity: 0,
    level: '',
    dayOfTheWeek: '',
    timeSlot: '',
    location: ''
  };

  onSubmit(form:NgForm) {
    
    this.router.navigate(['/admin/courses']);
  }

}
