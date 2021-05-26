package com.spaghettiCoders.klubber.application.mapper;

import com.spaghettiCoders.klubber.application.dto.MessageDTO;
import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.entity.Message;
import com.spaghettiCoders.klubber.application.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MessageMapper {

    Message mapToEntity(MessageDTO messageDTO);

    MessageDTO mapToDto(Message Message);

}
