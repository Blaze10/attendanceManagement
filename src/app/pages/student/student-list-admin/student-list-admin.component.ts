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
  private _searchName: string;
  private _searchYear: string;
  private _searchStream: string;
  filteredStudentList: Student[];
  teacherStream: string;
  p = 1;

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

  get searchName(): string {
    return this._searchName;
  }

  get searchYear(): string {
    return this._searchYear;
  }

  get searchStream(): string {
    return this._searchStream;
  }

  set searchName(value: string) {
    this._searchName = value;
    this.filteredStudentList = this.filterName(value);
  }

  set searchYear(value: string) {
    this._searchYear = value;
    this.filteredStudentList = this.filterYear(value);
  }

  set searchStream(value: string) {
    this._searchStream = value;
    this.filteredStudentList = this.filterStream(value);
  }

  getAllStudents() {
    this.studentService.getStudentList().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;

          if (x['stream'] === this.teacherStream) {
            this.studentList.push(x as Student);
          }
          this.filteredStudentList = this.studentList;
        });
      }),
      ((err) => {
        this.showLoader = false;
        this.alertify.error('Some error occured');
      })
    );
  }

  filterName(searchName: string) {
    return this.studentList.filter(list =>
      list.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
  }

  filterYear(searchYear: string) {
    return this.studentList.filter(list =>
      list.class.toLowerCase().indexOf(searchYear.toLowerCase()) !== -1);
  }

  filterStream(searchYear: string) {
    // if(searchYear === null) {
    //   return this.studentList;
    // }

    return this.studentList.filter(list =>
      list.stream.toLowerCase().indexOf(searchYear.toLowerCase()) !== -1);
  }

}
