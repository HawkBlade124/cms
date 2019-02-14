import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
@Input() message: Message;
messageSender: string = "";
canEdit: boolean= false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    let contact: Contact = this.contactService.getContact(this.message.sender);
    console.log(this.message);
    this.messageSender = contact.name;
  }


}
