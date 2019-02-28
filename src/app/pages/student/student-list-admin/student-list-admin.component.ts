import { StudentAuthService } from 'src/app/services/student-auth.service';
import { Teacher } from './../../../models/teachers.model';
import { TeachersService } from './../../../services/teachers.service';
import { StudentService } from './../../../services/student.service';

import { AlertifyService } from './../../../services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-list-admin',
  templateUrl: './student-list-admin.component.html',
  styleUrls: ['./student-list-admin.component.css']
})
export class StudentListAdminComponent implements OnInit {

  studentList: Student[] = [];
  showLoader = false;
  constructor(private router: Router, private studentService: StudentService,
      private alertify: AlertifyService, private teacherService: TeachersService,
      private sauthService: StudentAuthService) { }

  ngOnInit() {
    this.showLoader = true;
   this.getAllStudents();
  }

  getAllStudents() {
    this.studentService.getStudentList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;

          if (this.sauthService.isAdminLoggedIn()) {
            this.studentList.push(x as Student);
          }
        });
      }),
      ((err) => {
        this.showLoader = false;
        this.alertify.error('Some error occured');
      })
    );
  }

}
