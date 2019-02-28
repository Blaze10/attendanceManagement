import { StudentAuthService } from 'src/app/services/student-auth.service';
import { Teacher } from './../../../models/teachers.model';
import { TeachersService } from './../../../services/teachers.service';
import { StudentService } from './../../../services/student.service';

import { AlertifyService } from './../../../services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentList: Student[] = [];
  showLoader = false;
  teacherStream: string;
  constructor(private router: Router, private studentService: StudentService,
      private alertify: AlertifyService, private teacherService: TeachersService,
      private sauthService: StudentAuthService) { }

  ngOnInit() {
    this.showLoader = true;
    this.teacherService.getTeacher(localStorage.getItem('userId')).subscribe(
      ((item: Teacher) => {
        this.teacherStream = item.stream;
      }),
      ((err) => {
        console.log(err);
      })
    );
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
          } else {
            if (x['stream'] === this.teacherStream) {
              this.studentList.push(x as Student);
            }
          }
        });
      }),
      ((err) => {
        this.showLoader = false;
        this.alertify.error('Some error occured');
      })
    );
  }

  onAddTeacher() {
    this.router.navigate(['/studentCreate']);
  }

  onEdit(key) {
    this.router.navigate(['/studentCreate', key]);
  }

  onDelete(key) {
    this.studentService.deleteStudent(key).then(() => {
      this.alertify.success('Student removed');
      this.studentList = [];
      this.getAllStudents();
    }).catch(() => {
      this.alertify.error('Some error occured');
    });
  }
}
