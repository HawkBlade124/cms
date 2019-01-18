import { Component, OnInit } from '@angular/core';
import { Contacts } from './contact.model'
@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts: Contacts[] = [
    new Contacts(1, 'Bro. Jackson', 'jacksonk@byui.edu', "208-496-3771", 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', 'null'),
    new Contacts(2, 'Bro. Barzee', 'barzeer@byui.edu', "208-496-3768", 'https://web.byui.edu/Directory/Employee/barzeer.jpg', 'null'),
  ];
  constructor() { }

  ngOnInit() {
  }

}
