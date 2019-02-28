import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from './../../../services/alertify.service';
import { StudentService } from './../../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentAuthService } from 'src/app/services/student-auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoader = false;
  allStudents: Student[] = [];

  constructor(private studentService: StudentService, private alertify: AlertifyService,
    private router: Router, private _fb: FormBuilder, private sauthService: StudentAuthService) { }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: [],
      password: []
    });
  }

  onSubmit() {
    this.showLoader = true;
   const username = this.loginForm.value.username;
   const password = this.loginForm.value.password;

   this.studentService.getStudentList().snapshotChanges().subscribe(
     ((item) => {
       this.showLoader = false;
       item.forEach(element => {
         const list: any = element.payload.toJSON();
         list['$key'] = element.key;
         this.allStudents.push(list);
       });

       for (let i = 0; i < this.allStudents.length; i++) {
        if (username.toLowerCase() === this.allStudents[i].email.toLowerCase() && password === this.allStudents[i].password) {
          localStorage.setItem('role', 'Student');
          localStorage.setItem('name', this.allStudents[i].name);
          localStorage.setItem('userId', this.allStudents[i].$key);
          this.alertify.success('Logged In');
          this.router.navigate(['/home']);
          break;
        }
      }
      if (!this.sauthService.isLoggedIn()) {
        this.alertify.error('Invalid Credentials');
      }
     }),
     ((err) => {
      this.showLoader = false;
       console.log(err);
     })
   );
  }

}
