import { Component, OnInit } from '@angular/core';
import { CourseComponent } from "../course/course.component";
import { Course } from '../models/course.model';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-home',
  imports: [CourseComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  courses!: Course[];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (courses) => this.courses = courses,
      error: (error) => console.error('Erreur lors du chargement des cours:', error)
    });
  }
}
