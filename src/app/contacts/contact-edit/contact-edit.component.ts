import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: Contact = null;
  groupContacts: Contact[] =[];
  editMode:boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact:boolean;
  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {

  }

  isInvalidContact(newContact: Contact){
    if(!newContact){
      return true;
    }

    if (newContact.id === this.contact.id){
      return true;
    }

    for (let i = 0; i <this.groupContacts.length; i++){
      if (newContact.id === this.groupContacts[i].id){
        return true;
      }
    }
    return false;
  }

  addToGroup($event:any){
    let selectedContact: Contact = $event.dragData;
    if (this.invalidGroupContact){
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number){
    if (idx < 0 || idx >= this.groupContacts.length)
    return;

    this.groupContacts.splice(idx,1);
    this.invalidGroupContact = false;
  }
}
