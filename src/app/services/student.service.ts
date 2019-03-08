
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentList: AngularFireList<any>;

constructor(private afDatabase: AngularFireDatabase) { }

getStudentList() {
  this.studentList = this.afDatabase.list('Pillais/studentList');
  return this.studentList;
}

setStudentList(student: Student[]) {
  return this.studentList.push(student);
}

getStudent(key) {
  return this.afDatabase.object('Pillais/studentList/' + key).valueChanges();
}

updateStudent(student) {
  const key = student['index'];
  delete student['index'];
  return this.studentList.update(key, student);
}

updateStudentPassword(student: Student) {
  const key = student.$key;
  delete student.$key;
  return this.studentList.update(key, student);
}

deleteStudent(key) {
  return this.studentList.remove(key);
}
}
