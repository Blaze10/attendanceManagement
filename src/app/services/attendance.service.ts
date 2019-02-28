import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
AttendanceList: AngularFireList<any>;
constructor(private afDb: AngularFireDatabase) { }
getAttendanceList() {
  this.AttendanceList = this.afDb.list('Pillais/attendanceList');
  return this.AttendanceList;
}

setAttendanceList(data: any) {
  console.log(data);
  const key = data['key'];
  const month = data['month'];
  delete data['key'];
  delete data['month'];
  return this.afDb.object('Pillais/attendanceList/' + key + '/' + month).set(data);
}

getUserAttendance(key) {
  return this.afDb.list('Pillais/attendanceList/' + key);
}

}
