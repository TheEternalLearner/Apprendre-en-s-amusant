import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { CourseSignUpComponent } from './course-sign-up/course-sign-up.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AdminCourseListComponent } from './admin/course-list/course-list.component';
import { CourseFormComponent } from './admin/course-form/course-form.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserFormComponent } from './admin/user-form/user-form.component';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'A-propos', component: About},
    {path: 'inscription', component: CourseSignUpComponent},
    {path: 'cours', component: CourseListComponent},
    {path: 'admin/cours', component: AdminCourseListComponent},
    {path: 'admin/cours/nouveau', component: CourseFormComponent},
    {path: 'admin/cours/:id/edit', component: CourseFormComponent},
    {path: 'admin/utilisateurs', component: UserListComponent},
    {path: 'admin/utilisateurs/nouveau', component: UserFormComponent},
    {path: 'admin/utilisateurs/:id/edit', component: UserFormComponent}
];
