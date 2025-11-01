import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { SingleCourseComponent } from './single-course/single-course.component';

export const routes: Routes = [
    {path: '', component: Home},
    {path:':id', component: SingleCourseComponent},
    {path: 'A-propos', component: About}
];
