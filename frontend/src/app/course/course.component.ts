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
    this.router.navigateByUrl(`/${this.course.id}`);
  }

  truncate(text: String, maxLength: number): String {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
  }
}
