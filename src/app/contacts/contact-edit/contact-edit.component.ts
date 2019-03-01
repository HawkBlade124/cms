import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('f') clForm: NgForm;
  id: string;
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] =[];
  editMode = false;

  hasGroup: boolean = false;
  invalidGroupContact:boolean;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          // this.editMode = params['id'] != null;
          if (!this.id){
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(this.id);

          if(!this.originalContact){
           return;
          }

          this.editMode = true;

          this.contact = JSON.parse(JSON.stringify(this.originalContact));


  });
  }

  onSubmit(form:NgForm){
    const values = form.value;
    const newContact = new Contact(values.id, values.name, values.email,values.phone, values.imageUrl, values.group);
    if (this.editMode = true){
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else{
      ContactService.addContact(newDocument);
    }
    this.editMode = false;
    form.reset();
    this.onCancel();
    this.router.navigate['/contacts'];
  }

  onCancel(){
    this.router.navigate(['/contacts']);
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
