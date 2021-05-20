package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.MessageDTO;
import com.spaghettiCoders.klubber.application.entity.Message;
import com.spaghettiCoders.klubber.application.mapper.MessageMapper;
import com.spaghettiCoders.klubber.application.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;


    public List<Message> getPrivateMessages(String user1, String user2) {
        return messageRepository.getPrivateMessages(user1, user2);
    }

    public void savePrivateMessage(MessageDTO messageDTO) {
        Message message = messageMapper.mapToEntity(messageDTO);
        messageRepository.save(message);
    }
}
