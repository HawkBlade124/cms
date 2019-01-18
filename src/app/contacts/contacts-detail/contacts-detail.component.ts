import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contact.model';
@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contacts: Contacts[] = [
    new Contacts(1, 'Bro. Jackson', 'jacksonk@byui.edu', "208-496-3771", 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 'null'),
  ];
  constructor() { }

  ngOnInit() {
  }

}
