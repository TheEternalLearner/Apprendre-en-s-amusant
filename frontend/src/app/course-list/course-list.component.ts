import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  courses!: Course[];
  private router = inject(Router);

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: (error) => console.error('Error while loading courses:', error)
    })    
  }

  onSignUp(courseId: number): void {
    this.router.navigate(['/inscription'], { queryParams: { courseId } });
  }

}
