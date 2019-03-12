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

  storeMessages() {
    return this.http.put('https://cmsproject-4163e.firebaseio.com/messages.json', this.messageService.getMessages());
  }

   getMessages() {
    this.http.get('https://cmsproject-4163e.firebaseio.com/messages.json')
    .subscribe(
      (responseData:Message[]) => {
        this.messages = responseData;
        this.maxMessageId = this.getMaxId();
        this.messages.sort();
        this.messageListChangedEvent.next(this.messages.slice());
      }
    )
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
