import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from './chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  message : Observable<Message[]>;
  formValue : string;

  constructor(public chat: ChatService) { }

  ngOnInit() {
    //Add to array after each new message
    this.message = this.chat.conversation.asObservable()
      .pipe(scan((acc, val) => acc.concat(val)));
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

}
