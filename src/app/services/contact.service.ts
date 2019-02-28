import { Contact } from './../models/contact.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
contactList: AngularFireList<any>;
constructor(private afDb: AngularFireDatabase) { }

getContactLists() {
  this.contactList = this.afDb.list('Pillais/contactList');
  return this.contactList;
}

setContactList(message: Contact) {
  return this.contactList.push(message);
}

}
