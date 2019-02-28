import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { StudentAuthService } from './services/student-auth.service';
import { AlertifyService } from './services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivateChild {
  constructor(private sauthService: StudentAuthService, private alertify: AlertifyService,
    private router: Router) {}
canActivateChild(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) {
  if (this.sauthService.isTeacherLoggedIn()) {
    return true;
  } else {
    this.router.navigate(['/home']);
    this.alertify.error('Access Denied');
  }
}
}
