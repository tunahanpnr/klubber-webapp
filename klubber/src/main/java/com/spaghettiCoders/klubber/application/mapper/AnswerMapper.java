package com.spaghettiCoders.klubber.application.mapper;

import com.spaghettiCoders.klubber.application.dto.AnswerDTO;
import com.spaghettiCoders.klubber.application.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    List<Answer> mapToEntity(List<AnswerDTO> answerDTOList);

    List<AnswerDTO> mapToDto(List<Answer> answerList);

}
