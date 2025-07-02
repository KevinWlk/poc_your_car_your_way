import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { Subject, Observable } from 'rxjs';
import { ChatMessage } from './chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;
  private messageSubject = new Subject<ChatMessage>();

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws-chat'),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
      onConnect: () => {
        this.stompClient.subscribe('/topic/chat', (message: IMessage) => {
          const msg: ChatMessage = JSON.parse(message.body);
          this.messageSubject.next(msg);
        });
      }
    });
  }

  connect(): void {
    this.stompClient.activate();
  }


  sendMessage(msg: ChatMessage): void {
    this.stompClient.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(msg)
    });
  }

  getMessages(): Observable<ChatMessage> {
    return this.messageSubject.asObservable();
  }
}
