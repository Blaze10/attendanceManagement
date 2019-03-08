import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../../services/alertify.service';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/models/student.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  showLoader = false;
  mainLoader = false;
  detailedStudent: Student;
  studentKey;
  studentForm: FormGroup;
  constructor(private studentService: StudentService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.studentService.getStudentList();
    this.initStudentForm();
    this.getStudent();
  }

  getStudent() {
    this.mainLoader = true;
    this.studentKey = localStorage.getItem('userId');
    if (this.studentKey) {
      this.studentService.getStudent(this.studentKey).subscribe(
        ((student: Student) => {
          this.mainLoader = false;
          this.detailedStudent = student;
        }),
        ((err) => {
          this.mainLoader = false;
          console.log(err);
          this.alertify.error('Oops some error occured');
        })
      );
    }
  }

  initStudentForm() {
    this.studentForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit() {
    this.showLoader = true;
    this.detailedStudent.password = this.studentForm.value.password;
    this.detailedStudent.$key = this.studentKey;
    console.log(this.detailedStudent);
    this.studentService.updateStudentPassword(this.detailedStudent).then(() => {
      this.alertify.success('Password successfully updated');
      this.showLoader = false;
    }).catch((err) => {
      this.showLoader = false;
      console.log(err);
      this.alertify.error('Oops some error occured');
    });
  }

}
