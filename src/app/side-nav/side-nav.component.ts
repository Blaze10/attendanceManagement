import { AlertifyService } from './../services/alertify.service';
import { StudentAuthService } from './../services/student-auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  username;
  constructor(public sauthService: StudentAuthService, private router: Router,
      private alertify: AlertifyService) {
        this.username = localStorage.getItem('name');
       }

  ngOnInit() {
    this.username = localStorage.getItem('name');
  }

  onLogout() {
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
        this.alertify.success('Logged out');
  }

}
