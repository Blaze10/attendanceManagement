import { Admin } from './../../../models/admin.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from './../../../services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { StudentAuthService } from 'src/app/services/student-auth.service';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup;
  showLoader = false;
  allAdmin: Admin[] = [];

  constructor(private adminService: AdminService, private alertify: AlertifyService,
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

   this.adminService.getAdminList().snapshotChanges().subscribe(
     ((item) => {
       this.showLoader = false;
       item.forEach(element => {
         const list: any = element.payload.toJSON();
         list['$key'] = element.key;
         this.allAdmin.push(list);
       });

       for (let i = 0; i < this.allAdmin.length; i++) {
        if (username.toLowerCase() === this.allAdmin[i].email.toLowerCase() && password === this.allAdmin[i].password) {
          localStorage.setItem('role', 'Admin');
          localStorage.setItem('name', this.allAdmin[i].name);
          localStorage.setItem('userId', this.allAdmin[i].$key);
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
