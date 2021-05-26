package com.spaghettiCoders.klubber.application.mapper;

import com.spaghettiCoders.klubber.application.dto.AnswerDTO;
import com.spaghettiCoders.klubber.application.dto.QuestionDTO;
import com.spaghettiCoders.klubber.application.entity.Answer;
import com.spaghettiCoders.klubber.application.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring",unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {
    List<Question> mapToEntity(List<QuestionDTO> questionDTOList);

    List<QuestionDTO> mapToDto(List<Question> questions);
}