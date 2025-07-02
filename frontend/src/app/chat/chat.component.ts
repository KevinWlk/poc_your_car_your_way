import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  msg = '';
  messages: any[] = [];

  constructor(private chatService: ChatService) {
    this.chatService.connect((message) => this.messages.push(message));
  }

  send() {
    if (this.msg.trim() === '') return;
    this.chatService.sendMessage({ sender: 'Client', content: this.msg });
    this.msg = '';
  }
}
