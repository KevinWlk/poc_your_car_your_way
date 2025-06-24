import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../chat-message.model';

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.css']
})
export class ClientChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  content: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.getMessages().subscribe(msg => {
      this.messages.push(msg);
    });
  }

  send(): void {
    const msg: ChatMessage = {
      sender: 'Client',
      content: this.content,
      timestamp: new Date().toISOString()
    };
    this.chatService.sendMessage(msg);
    this.content = '';
  }
}
