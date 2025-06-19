import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { ChatMessage } from './chat-message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  username: string = 'Client';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.messages$.subscribe(message => {
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message: ChatMessage = {
        sender: this.username,
        content: this.newMessage
      };
      this.chatService.sendMessage(message);
      this.newMessage = '';
    }
  }
}
