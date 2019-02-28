import { TeachersService } from './../../../services/teachers.service';
import { StudentService } from './../../../services/student.service';
import { Student } from './../../../models/student.model';
import { AlertifyService } from './../../../services/alertify.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AttendanceService } from './../../../services/attendance.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/models/teachers.model';

@Component({
  selector: 'app-attendance-fill',
  templateUrl: './attendance-fill.component.html',
  styleUrls: ['./attendance-fill.component.css']
})
export class AttendanceFillComponent implements OnInit {
   monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   showLoader = false;
   attendanceForm: FormGroup;
   allStudents: Student[] = [];
   studentIndex: string;
   teacherStream: string;
  //  selectedSubject: string;
  constructor(private router: Router, private atnService: AttendanceService,
      private alertify: AlertifyService, private _fb: FormBuilder, private studentService: StudentService,
      private teacherService: TeachersService) { }

  ngOnInit() {
    this.teacherService.getTeacher(localStorage.getItem('userId')).subscribe(
      ((item: Teacher) => {
        this.teacherStream = item.stream;
        // this.selectedSubject = item.subject;
      }),
      ((err) => {
        console.log(err);
      })
    );
    this.studentService.getStudentList().snapshotChanges().subscribe(
      ((item) => {
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          if (x['stream'] === this.teacherStream) {
            this.allStudents.push(x as Student);
          }
        });
      }),
      ((err) => {
        console.log(err);
        this.alertify.error('Oops some error occured');
      })
    );

    this.attendanceForm = this._fb.group({
      key: [null, Validators.required],
      month: [null, Validators.required],
      totalLectures: ['', Validators.required],
      attendedLectures: ['', Validators.required]
      // subject: [this.selectedSubject]
    });
  }

  onSubmit() {
    this.showLoader = true;
    const percentage = ((this.attendanceForm.value.attendedLectures * 100) / this.attendanceForm.value.totalLectures).toFixed(2);
    // if (!this.attendanceForm.value.subject) {
    //   this.attendanceForm.value.subject = this.selectedSubject;
    // }
    this.atnService.setAttendanceList({... this.attendanceForm.value, percentage: percentage})
    .then(() => {
      this.showLoader = false;
      this.alertify.success('Record inserted');
      this.attendanceForm.reset();
      this.initForm();
    }).catch(() => {
      this.showLoader = false;
      this.alertify.error('Oops some error occured');
    });
  }

  onCancel() {
    this.router.navigate(['/home']);
  }

  initForm() {
    this.attendanceForm = this._fb.group({
      key: null,
      month: null,
      totalLectures: '',
      attendedLectures: ''
      // subject: this.selectedSubject
    });
  }


}
