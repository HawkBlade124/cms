import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messageChangeEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;
  id: number;

  messages: Message[] = [];
  constructor(private http: HttpClient, private messageService: MessagesService) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http.get<{message: string, messages: Message[]}>( 'http://localhost:3000/messages')
    .subscribe(
      (messageData) => {
        this.messages = messageData.messages;
        this.messageListChangedEvent.next(this.messages.slice());
      });
  }
  getMessage(index: string) {
    return this.messages[index];
  }

  getMaxId(): number{
    var maxId = 0;
     for(let message of this.messages){
      var currentId = message.id;
       if(+currentId > maxId){
        +maxId;
       }
     }
     return maxId;
   }


   addMessage(message: Message){
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
  }
}
