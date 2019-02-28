import { AlertifyService } from './../../../services/alertify.service';
import { Contact } from './../../../models/contact.model';
import { ContactService } from './../../../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  allMessages: Contact[] = [];
  showLoader = false;
  constructor(private contactService: ContactService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.showLoader = true;
    this.contactService.getContactLists().snapshotChanges().subscribe(
      ((item) => {
        this.showLoader = false;
        item.forEach(element => {
          const x = element.payload.toJSON();
          x['$key'] = element.key;
          this.allMessages.push(x as Contact);
        });
      }),
      ((err) => {
        this.showLoader = false;
        this.alertify.error('Some error occured');
      })
    )
  }

}
