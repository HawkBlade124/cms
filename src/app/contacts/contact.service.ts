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
  id: number;
  maxContactId: number;


  constructor(private http: HttpClient, private contactService: ContactService) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }
   storeContacts() {
    return this.http.put('https://cmsproject-4163e.firebaseio.com/contacts.json', this.contactService.getContacts());
  }

   getContacts() {
    this.http.get('https://cmsproject-4163e.firebaseio.com/contacts.json')
    .subscribe(
      (responseData: Contact[]) => {
        this.contacts = responseData;
        this.maxContactId = this.getMaxId();
        this.contacts.sort();
        this.contactListChangedEvent.next(this.contacts.slice());
      }
    )
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

  // addContact(contact: Contact) {
  //   if(!contact){
  //     return;
  //   }

  //   contact.id = '';
  //   const headers = new HttpHeaders({'Content-Type':'application/json'});
  //   this.http.post<{ message: string, contact:Contact}>('http//localhost:4200/contacts',
  //   contact,
  //   { headers: headers })
  //   .subscribe(
  //     (responseData) => {
  //       this.contacts.push(responseData.contact);

  //     }
  //   );


  // }

}
