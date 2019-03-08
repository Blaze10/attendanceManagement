import { ContactService } from './services/contact.service';
import { AdminAuthGuard } from './admin-auth.guard';
import { StudentAuthGuard } from './student-auth.guard';
import { AttendanceService } from './services/attendance.service';
import { StudentAuthService } from './services/student-auth.service';
import { StudentService } from './services/student.service';
import { AlertifyService } from './services/alertify.service';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TeacherListComponent } from './pages/teacher/teacher-list/teacher-list.component';
import { TeacherCreateComponent } from './pages/teacher/teacher-create/teacher-create.component';
import { HomeComponent } from './pages/home/home.component';
import { TeachersService } from './services/teachers.service';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { StudentCreateComponent } from './pages/student/student-create/student-create.component';
import { TeacherLoginComponent } from './pages/auth/teacher-login/teacher-login.component';
import { StudentLoginComponent } from './pages/auth/student-login/student-login.component';
import { AttendanceFillComponent } from './pages/attendance/attendance-fill/attendance-fill.component';
import { MyAttendanceComponent } from './pages/attendance/my-attendance/my-attendance.component';
import { AdminLoginComponent } from './pages/auth/admin-login/admin-login.component';
import { AboutComponent } from './pages/about/about.component';
import { TeacherAuthGuard } from './teacher-auth.guard';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ContactListComponent } from './pages/contact-us/contact-list/contact-list.component';
import { StudentListAdminComponent } from './pages/student/student-list-admin/student-list-admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { AttendanceDefaultersComponent } from './pages/attendance/attendance-defaulters/attendance-defaulters.component';
import { EditProfileComponent } from './pages/student/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    TeacherListComponent,
    TeacherCreateComponent,
    HomeComponent,
    StudentListComponent,
    StudentCreateComponent,
    TeacherLoginComponent,
    StudentLoginComponent,
    AttendanceFillComponent,
    MyAttendanceComponent,
    AdminLoginComponent,
    AboutComponent,
    ContactUsComponent,
    ContactListComponent,
    StudentListAdminComponent,
    AttendanceDefaultersComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxPaginationModule
  ],
  providers: [
    TeachersService,
    AlertifyService,
    StudentService,
    StudentAuthService,
    AttendanceService,
    StudentAuthGuard,
    TeacherAuthGuard,
    AdminAuthGuard,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
