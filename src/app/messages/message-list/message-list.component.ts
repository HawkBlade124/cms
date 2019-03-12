import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';
import { ContactService } from 'src/app/contacts/contact.service';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] =[];

  constructor(private messageService: MessagesService) { }

  ngOnInit() {

    this.messageService.messageListChangedEvent.subscribe(
      (messages: Message[]) => {
        this.messages = messages;
      }
      );
      this.messageService.getMessages();
  }
  onAddMessage(message: Message){
    this.messages.push(message);
  }
}
