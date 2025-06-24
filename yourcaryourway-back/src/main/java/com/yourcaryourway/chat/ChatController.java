package com.yourcaryourway.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.yourcaryourway.chat.ChatMessage;


import java.time.Instant;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Controller
public class ChatController {
    @MessageMapping("/chat.send")
    @SendTo("/topic/chat")
    public ChatMessage sendMessage(@Payload ChatMessage message) {
        message.setTimestamp(Instant.parse(LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"))));
        return message;
    }
}