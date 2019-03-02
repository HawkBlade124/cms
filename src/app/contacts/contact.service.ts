import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactsChanged = new Subject<Contact[]>();
  contacts: Contact[] = [];
  id: number;
  maxContactId: number;


  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

   getContacts(): Contact[]{
    return this.contacts.slice();
   }

   getContact(id: string): Contact{
    for(let contact of this.contacts){
      if(contact.id === id){
        return contact;
      }
    }
   }

   getMaxId(): number{
    var maxId = 0;
     for(let document of this.contacts){
      var currentId = document.id;
       if(+currentId > maxId){
        +maxId;
       }
     }
     return maxId;
   }

   updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact){
      return;
    }

    const pos = this.contacts.indexOf(originalContact);

    if ( pos < 0){
      return;
    }


    this.contacts[pos] = newContact;
  }
  deleteContact(contacts: Contact) {
    if (document === null) {
      return;
    }

    const pos = this.contacts.indexOf(contacts);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {


    if(!newContact){
      return;
    }
    this.maxContactId++;
    // this.addDocument.id = this.maxDocumentId;
    this.contacts.push(...this.contacts);
    newContact[this.id] = this.contacts.slice();
    // this.contactListChangedEvent.next(newContact)

  }

}
