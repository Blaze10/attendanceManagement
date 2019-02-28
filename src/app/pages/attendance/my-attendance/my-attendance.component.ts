import { Attendance } from './../../../models/attendance.model';
import { AttendanceService } from './../../../services/attendance.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-attendance',
  templateUrl: './my-attendance.component.html',
  styleUrls: ['./my-attendance.component.css']
})
export class MyAttendanceComponent implements OnInit {
  studentId;
  studentName;
  attendanceList: Attendance[] = [];
  showLoader = false;
  constructor(private atnService: AttendanceService) { }

  ngOnInit() {
    this.showLoader = true;
    this.studentId = localStorage.getItem('userId');
    this.studentName = localStorage.getItem('name');
    this.atnService.getUserAttendance(this.studentId).snapshotChanges().subscribe(
      ((list) => {
        this.showLoader = false;
        list.forEach(element => {
          const x = element.payload.toJSON();
          x['month'] = element.key;
          this.attendanceList.push(x as Attendance);
        })
      }),
      ((err) => {
        this.showLoader = false;
        console.log(err);
      })
    );
  }

}
