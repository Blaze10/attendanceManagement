import { ContactListComponent } from './pages/contact-us/contact-list/contact-list.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { MyAttendanceComponent } from './pages/attendance/my-attendance/my-attendance.component';
import { AttendanceFillComponent } from './pages/attendance/attendance-fill/attendance-fill.component';
import { StudentLoginComponent } from './pages/auth/student-login/student-login.component';
import { TeacherCreateComponent } from './pages/teacher/teacher-create/teacher-create.component';
import { TeacherListComponent } from './pages/teacher/teacher-list/teacher-list.component';
import { HomeComponent } from './pages/home/home.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { StudentCreateComponent } from './pages/student/student-create/student-create.component';
import { TeacherLoginComponent } from './pages/auth/teacher-login/teacher-login.component';
import { StudentAuthGuard } from './student-auth.guard';
import { TeacherAuthGuard } from './teacher-auth.guard';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { StudentListAdminComponent } from './pages/student/student-list-admin/student-list-admin.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: StudentLoginComponent},
  {path: 'teachersLogin', component: TeacherLoginComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'about-us', component: AboutComponent},
  {path: 'contact-us', component: ContactUsComponent},
  {
    path: '',
    canActivateChild: [StudentAuthGuard],
    children: [
      {path: 'myAttendance', component: MyAttendanceComponent}
    ]
  },
  {
    path: '',
    canActivateChild: [AdminAuthGuard],
    children: [
      // {path: 'studentList', component: StudentListComponent},
      // {path: 'studentCreate', component: StudentCreateComponent},
      // {path: 'studentCreate/:id', component: StudentCreateComponent},
      {path: 'teacherList', component: TeacherListComponent},
      {path: 'teacherCreate', component: TeacherCreateComponent},
      {path: 'teacherCreate/:id', component: TeacherCreateComponent},
      {path: 'contactList', component: ContactListComponent},
      {path: 'student-list-admin', component: StudentListAdminComponent}
    ]
  },
  {
    path: '',
    canActivateChild: [TeacherAuthGuard],
    children: [
      {path: 'studentList', component: StudentListComponent},
      {path: 'studentCreate', component: StudentCreateComponent},
      {path: 'studentCreate/:id', component: StudentCreateComponent},
      {path: 'fillAttendance', component: AttendanceFillComponent},
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
