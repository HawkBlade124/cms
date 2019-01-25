import { Component, OnInit, ViewChild, ElementRef,EventEmitter, Output} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender = 'Ben Fuller';

  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;
    const newMessage = new Message(1, subject, msgText, this.currentSender );
    this.addMessageEvent.emit(newMessage);
  }
  onClear(){
    const clearMessage = new Message(1,'','',this.currentSender);
  }
}
