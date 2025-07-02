import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../chat-message.model';

@Component({
  selector: 'app-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.css']
})
export class SupportChatComponent implements OnInit {
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
      sender: 'Support',
      content: this.content,
      timestamp: new Date().toISOString()
    };
    this.chatService.sendMessage(msg);
    this.content = '';
  }
}
