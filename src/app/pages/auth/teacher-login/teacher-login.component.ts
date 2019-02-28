import { Teacher } from './../../../models/teachers.model';
import { TeachersService } from './../../../services/teachers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from './../../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/student-auth.service';

@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoader = false;
  allTeachers: Teacher[] = [];

  constructor(private teachersService: TeachersService, private alertify: AlertifyService,
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

   this.teachersService.getTeacherList().snapshotChanges().subscribe(
     ((item) => {
       this.showLoader = false;
       item.forEach(element => {
         const list: any = element.payload.toJSON();
         list['$key'] = element.key;
         this.allTeachers.push(list);
       });

       for (let i = 0; i < this.allTeachers.length; i++) {
        if (username.toLowerCase() === this.allTeachers[i].email.toLowerCase() && password === this.allTeachers[i].password) {
          localStorage.setItem('role', 'Teacher');
          localStorage.setItem('name', this.allTeachers[i].name);
          localStorage.setItem('userId', this.allTeachers[i].$key);
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
