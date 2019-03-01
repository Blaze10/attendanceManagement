import { TeachersService } from './../../../services/teachers.service';
import { AlertifyService } from './../../../services/alertify.service';
import { AttendanceService } from './../../../services/attendance.service';
import { AttendanceDefaulters } from './../../../models/attendance-def.model';
import { Attendance } from './../../../models/attendance.model';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Teacher } from 'src/app/models/teachers.model';

@Component({
  selector: 'app-attendance-defaulters',
  templateUrl: './attendance-defaulters.component.html',
  styleUrls: ['./attendance-defaulters.component.css']
})
export class AttendanceDefaultersComponent implements OnInit {
  allStudents: Student[] = [];
  showLoader = false;
  allAttendance: Attendance[] = [];
  attendanceDefaulers: AttendanceDefaulters[] = [];
  defaultersList = [];
  teacherStream: string;
  p = 1;
  filteredAttendanceList: AttendanceDefaulters[];
  private _searchName: string;
  private _searchYear: string;
  private _searchStream: string;
  private _searchMonth: string;

  constructor(private studentServivce: StudentService, private attendanceService: AttendanceService,
      private alertify: AlertifyService, private teacherService: TeachersService) { }

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

    this.studentServivce.getStudentList().snapshotChanges().subscribe(
      ((item) => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.allStudents.push(x as Student);
        });
        for (let item of this.allStudents) {
          this.attendanceService.getUserAttendance(item.$key).snapshotChanges().subscribe(
            ((att) => {
              this.showLoader = false;
              att.forEach(ele => {
                const y = ele.payload.toJSON();
                y['month'] = ele.key;
                if(y['percentage'] <= 50 && item.stream === this.teacherStream) {
                  this.attendanceDefaulers.push({attendance: y as Attendance, student: item});
                }
              });
            })
          );
        }
        this.filteredAttendanceList = this.attendanceDefaulers;
      }),
      ((err) => {
        this.showLoader = false;
        this.alertify.error('Some error occured');
        console.log(err);
      })
    );
  }

  get searchName(): string {
    return this._searchName;
  }

  get searchYear(): string{
    return this._searchYear;
  }

  get searchStream(): string{
    return this._searchStream;
  }

  get searchMonth(): string{
    return this._searchMonth;
  }

  set searchName(value: string) {
    this._searchName = value;
    this.filteredAttendanceList = this.filterName(value);
  }

  set searchYear(value: string) {
    this._searchYear = value;
    this.filteredAttendanceList = this.filterYear(value);
  }

  set searchStream(value: string) {
    this._searchStream = value;
    this.filteredAttendanceList = this.filterStream(value);
  }

  set searchMonth(value: string) {
    this._searchMonth = value;
    this.filteredAttendanceList = this.filterMonth(value);
  }

  filterName(searchName: string) {
    return this.attendanceDefaulers.filter(list =>
      list.student.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
  }
  filterYear(searchYear: string) {
    return this.attendanceDefaulers.filter(list =>
      list.student.class.toLowerCase().indexOf(searchYear.toLowerCase()) !== -1);
  }
  filterStream(searchStream: string) {
    return this.attendanceDefaulers.filter(list =>
      list.student.stream.toLowerCase().indexOf(searchStream.toLowerCase()) !== -1);
  }
  filterMonth(searchMonth: string) {
    return this.attendanceDefaulers.filter(list =>
      list.attendance.month.toLowerCase().indexOf(searchMonth.toLowerCase()) !== -1);
  }
}
