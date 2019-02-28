import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
<<<<<<< HEAD
import { Subject } from 'rxjs';
=======
import { Subscription } from 'rxjs/Subscription';
>>>>>>> f837bd5cde805c7cfbafd1bbb634447d8128393b

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact>();
  contacts: Contact[] = [];
  private subscription: Subscription;

  constructor() {
    this.contacts = MOCKCONTACTS;
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
    return null;
   }

   deleteContact(contact: Contact){

   }
}
