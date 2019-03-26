import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  contactsChanged = new Subject<Contact[]>();
  contacts: Contact[] = [];

  maxContactId: number;


  constructor(private http: HttpClient, private contactService: ContactService) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

  getContacts() {
    this.http.get<{message: string, contacts: Contact[]}>( 'http://localhost:3000/contacts')
    .subscribe(
      (contactData) => {
        this.contacts = contactData.contacts;
        //this.maxDocumentId = this.getMaxId();
        this.contacts.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }


  getContact(index: string) {
    return this.contacts[index];
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

  addContact(contact: Contact) {
    if(!Contact){
      return;
    }

    contact.id = '';
    const headers = new HttpHeaders({'Content-Type':'text/plain'});

    this.http.post<{message: string, contacts: Contact}>('https://localhost:3000/contacts',
      document,  {headers: headers}).subscribe(
      (responseData) => {
        this.contacts.push(responseData.contacts);
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    );
  }

}
