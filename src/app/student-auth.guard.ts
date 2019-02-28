import { AlertifyService } from './services/alertify.service';
import { StudentAuthService } from './services/student-auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivateChild {
  constructor(private sauthService: StudentAuthService, private alertify: AlertifyService,
      private router: Router) {}
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.sauthService.isStudentLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/home']);
      this.alertify.error('Access Denied');
    }
  }
}
