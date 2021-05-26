package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.dto.MessageDTO;
import com.spaghettiCoders.klubber.application.entity.Message;
import com.spaghettiCoders.klubber.application.mapper.MessageMapper;
import com.spaghettiCoders.klubber.application.mapper.UsersMapper;
import com.spaghettiCoders.klubber.application.service.AuthService;
import com.spaghettiCoders.klubber.application.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final AuthService authService;
    private final MessageService messageService;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/chat/{to}")
    public MessageDTO sendMessage(@DestinationVariable String to,@Payload MessageDTO messageDTO) {
        System.out.println("handling send message: " + messageDTO + " to: " + to);

        messageService.savePrivateMessage(messageDTO);
        simpMessagingTemplate.convertAndSend("/topic/messages/" + to, messageDTO);

        return messageDTO;
    }

    @GetMapping("/getPrivMessages/{user1}/{user2}")
    public List<Message> getPrivMessages(@PathVariable String user1, @PathVariable String user2) {
        return messageService.getPrivateMessages(user1, user2);
    }

    @GetMapping("/getSubClubMessages/{subClub}")
    public List<Message> getSubClubMessages(@PathVariable String subClub) {
        return messageService.getSubClubMessages(subClub);
    }


}
