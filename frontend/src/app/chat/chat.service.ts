import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from 'rxjs';
import { ChatMessage } from './chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;
  private messageSubject = new Subject<ChatMessage>();

  public messages$ = this.messageSubject.asObservable();

  constructor() {
    this.stompClient = Stomp.over(() => new SockJS('http://localhost:8080/ws'));

    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/topic/messages', (message: IMessage) => {
        const chatMessage: ChatMessage = JSON.parse(message.body);
        this.messageSubject.next(chatMessage);
      });
    };

    this.stompClient.onStompError = console.error;

    this.stompClient.activate();
  }

  sendMessage(chatMessage: ChatMessage) {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat',
        body: JSON.stringify(chatMessage)
      });
    } else {
      console.warn('WebSocket non connecté. Message non envoyé :', chatMessage);
    }
  }
}
