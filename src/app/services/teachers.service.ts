import { Teacher } from './../models/teachers.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  teachersList: AngularFireList<any>;

constructor(private afDatabase: AngularFireDatabase) { }

getTeacherList() {
  this.teachersList = this.afDatabase.list('Pillais/teacherList');
  return this.teachersList;
}

setTeacherList(teachers: Teacher[]) {
  return this.teachersList.push(teachers);
}

getTeacher(key) {
  return this.afDatabase.object('Pillais/teacherList/' + key).valueChanges();
}

updateTeacher(teacher) {
  const key = teacher['index'];
  delete teacher['index'];
  return this.teachersList.update(key, teacher);
}

deleteTeacher(key) {
  return this.teachersList.remove(key);
}
}
