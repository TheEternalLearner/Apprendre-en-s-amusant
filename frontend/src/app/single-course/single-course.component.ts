import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-single-course',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './single-course.component.html',
  styleUrls: ['./single-course.component.css']
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
