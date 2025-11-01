import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-single-course',
  imports: [],
  templateUrl: './single-course.component.html',
  styleUrl: './single-course.component.css'
})
export class SingleCourseComponent implements OnInit {
  course!: Course;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCourse(); 
  }

  private getCourse(): void {
    const CourseId = this.route.snapshot.params['id'];
    this.course = this.courseService.getCourseById(CourseId);
  }

}
