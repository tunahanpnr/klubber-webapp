package com.spaghettiCoders.klubber.application.mapper;

import com.spaghettiCoders.klubber.application.dto.ClubDTO;
import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.entity.Club;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ClubMapper {
    Club mapToEntity(ClubDTO clubDTO);

    ClubDTO mapToDto(Club club);

    List<Club> mapToEntity(List<UserDTO> userDTOS);

    List<ClubDTO> mapToDto(List<Club> clubs);
}
