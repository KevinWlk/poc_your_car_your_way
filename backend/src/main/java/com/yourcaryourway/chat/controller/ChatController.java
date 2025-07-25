package com.yourcaryourway.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.yourcaryourway.chat.model.ChatMessage;


import java.time.Instant;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {
    @MessageMapping("/chat.send")
    @SendTo("/topic/chat")
    public ChatMessage sendMessage(@Payload ChatMessage message) {
        message.setTimestamp(Instant.now());
    return message;
    }
}