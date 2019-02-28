import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
adminList: AngularFireList<any>;
constructor(private afDB: AngularFireDatabase) { }

getAdminList() {
  this.adminList = this.afDB.list('Pillais/adminList');
  return this.adminList;
}

}
