import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthService {

username: string;

constructor(private _db: AngularFireDatabase) { }

isLoggedIn() {
  return !!localStorage.getItem('role') &&
          localStorage.getItem('name') &&
          localStorage.getItem('userId');
}

isStudentLoggedIn() {
  return !!(localStorage.getItem('role') === 'Student');
}

isTeacherLoggedIn() {
  return !!(localStorage.getItem('role') === 'Teacher');
}

isAdminLoggedIn() {
  return !!(localStorage.getItem('role') === 'Admin');
}

getUsername() {
  this.username = '';
  if (this.isLoggedIn()) {
    this.username = localStorage.getItem('name');
  } else {
    this.username = '';
  }
}

}
