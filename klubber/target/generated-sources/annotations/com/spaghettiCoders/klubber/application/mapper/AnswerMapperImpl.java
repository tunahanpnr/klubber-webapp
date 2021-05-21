package com.spaghettiCoders.klubber.application.mapper;

import com.spaghettiCoders.klubber.application.dto.request.AnswersSelectionReqDTO;
import com.spaghettiCoders.klubber.application.entity.Answer;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-05-21T23:28:54+0300",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 14.0.2 (Oracle Corporation)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public List<Answer> mapToEntity(List<AnswersSelectionReqDTO> answersSelectionReqDTO) {
        if ( answersSelectionReqDTO == null ) {
            return null;
        }

        List<Answer> list = new ArrayList<Answer>( answersSelectionReqDTO.size() );
        for ( AnswersSelectionReqDTO answersSelectionReqDTO1 : answersSelectionReqDTO ) {
            list.add( answersSelectionReqDTOToAnswer( answersSelectionReqDTO1 ) );
        }

        return list;
    }

    protected Answer answersSelectionReqDTOToAnswer(AnswersSelectionReqDTO answersSelectionReqDTO) {
        if ( answersSelectionReqDTO == null ) {
            return null;
        }

        Answer answer = new Answer();

        return answer;
    }
}
