import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  /**  Pour l'instant mes courses sont ici
    * A l'avenir peut être avoir une api qui gère ?
    * Dans le cas d'outil admin 
    */
  private courses: Course[] = [
    new Course('My first Course',
      'This course is dedicated to learning the basics concepts',
      'https://cdn.pixabay.com/photo/2015/11/26/09/14/school-1063556_960_720.jpg',
      12,
      'Beginner',
      '8-12 years'
    ),
    new Course('My second Course',
      'This course is dedicated to learning intermediate concepts',
      'https://cdn.pixabay.com/photo/2014/10/14/20/14/library-488678_960_720.jpg',
      8,
      'Beginner',
      '8-12 years'
    ),
    new Course('My third Course',
      'This course is dedicated to learning intermediate concepts',
      'https://cdn.pixabay.com/photo/2015/05/19/14/55/educational-773651_960_720.jpg',
      15,
      'Beginner',
      '8-12 years'
    )
  ];

  getCourses(): Course[] {
    return  [...this.courses];
  }

  getCourseById(CourseId: string): Course {
    const foundCourse = this.courses.find(course => course.id === CourseId);
    if (!foundCourse) {
      throw new Error('Course not found');
    }
    return foundCourse;
  }

}
