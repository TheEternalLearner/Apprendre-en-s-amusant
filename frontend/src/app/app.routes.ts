import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { CourseSignUpComponent } from './course-sign-up/course-sign-up.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseListComponent as AdminCourseListComponent } from './admin/course-list/course-list.component';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'A-propos', component: About},
    {path: 'inscription', component: CourseSignUpComponent},
    {path: 'cours', component: CourseListComponent},
    {path: 'admin/cours', component: AdminCourseListComponent}
];
