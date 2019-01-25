import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Output() addMessageEvent = new EventEmitter<Message>();
  messages: Message[] =[
    new Message(1, 'Help', 'I need help on this assignment, can you provide that?', 'Ben Fuller'),
    new Message(2, 'Help', 'Of Course, what can I help you with?', 'Bro. Barzee'),
    new Message(3, 'Help', 'Thank you', 'Ben Fuller')
  ];

  constructor() { }

  ngOnInit() {
  }
  onAddMessage(message: Message){
    this.addMessageEvent.emit(message);
  }
}
