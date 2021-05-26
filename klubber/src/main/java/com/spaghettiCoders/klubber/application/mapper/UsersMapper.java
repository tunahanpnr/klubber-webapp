package com.spaghettiCoders.klubber.application.mapper;
import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.request.RegisterReqDTO;
import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.entity.Users;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UsersMapper {
    Users mapToEntity(UserDTO usersDTO);

    Users mapToEntity(RegisterReqDTO registerDTO);

    Users mapToEntity(LoginReqDTO loginReqDTO);

    UserDTO mapToDto(Users users);

    List<Users> mapToEntity(List<UserDTO> usersDTOList);

    List<UserDTO> mapToDto(List<Users> usersList);
}
