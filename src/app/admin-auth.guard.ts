import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentAuthService } from './services/student-auth.service';
import { AlertifyService } from './services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivateChild {
  constructor(private sauthService: StudentAuthService, private alertify: AlertifyService,
    private router: Router) {}
canActivateChild(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) {
  if (this.sauthService.isAdminLoggedIn()) {
    return true;
  } else {
    this.router.navigate(['/home']);
    this.alertify.error('Access Denied');
  }
}
}
