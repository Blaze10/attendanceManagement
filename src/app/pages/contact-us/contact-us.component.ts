import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from './../../services/alertify.service';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  showLoader = false;

  constructor(private contactService: ContactService, private alertify: AlertifyService,
      private router: Router) { }

  ngOnInit() {
    this.contactService.getContactLists();
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      message: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.showLoader = true;
    this.contactService.setContactList(this.contactForm.value)
    .then(() => {
      this.showLoader = false;
      this.alertify.success('Thank you. Message sent.');
      this.contactForm.reset();
    }).catch(() => {
      this.showLoader = false;
      this.alertify.error('Some error occured');
    });
  }

}
