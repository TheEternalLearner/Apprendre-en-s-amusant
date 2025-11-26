import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Course } from "../models/course.model";

@Component({
  selector: 'app-course',
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {
  @Input() course!: Course;

  constructor(private router:Router) {}

  onViewCourse() {
    this.router.navigate(['/inscription'], { queryParams: { courseId: this.course.id } });
  }
}
