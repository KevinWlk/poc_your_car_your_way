package com.poc.backend.controller;

import com.poc.backend.model.Message;
import com.poc.backend.model.User;
import com.poc.backend.repository.MessageRepository;
import com.poc.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessage(ChatMessage chatMessage) {
        User sender = userRepository.findById(chatMessage.getSenderId()).orElseThrow();
        User receiver = userRepository.findById(chatMessage.getReceiverId()).orElseThrow();

        Message message = Message.builder()
                .content(chatMessage.getContent())
                .timestamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .sender(sender)
                .receiver(receiver)
                .build();

        return messageRepository.save(message);
    }

    public static class ChatMessage {
        private Integer senderId;
        private Integer receiverId;
        private String content;

        public Integer getSenderId() { return senderId; }
        public void setSenderId(Integer senderId) { this.senderId = senderId; }
        public Integer getReceiverId() { return receiverId; }
        public void setReceiverId(Integer receiverId) { this.receiverId = receiverId; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
    }
}