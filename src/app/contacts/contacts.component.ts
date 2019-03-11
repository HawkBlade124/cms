import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model'
import { ContactService } from './contact.service';
@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;
  term: string;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => {
        this.selectedContact = contact;
      }
    );
  }
  onKeyPress(value:string){
    this.term = value
  }

  filteredStatus="";

}
