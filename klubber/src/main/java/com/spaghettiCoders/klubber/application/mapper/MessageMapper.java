package com.spaghettiCoders.klubber.application.mapper;

import com.spaghettiCoders.klubber.application.dto.MessageDTO;
import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.entity.Message;
import com.spaghettiCoders.klubber.application.entity.Users;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    Message mapToEntity(MessageDTO messageDTO);

    MessageDTO mapToDto(Message Message);

}
