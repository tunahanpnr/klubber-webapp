package com.spaghettiCoders.klubber.application.dto.request;


import com.spaghettiCoders.klubber.application.entity.Answer;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AnswersSelectionReqDTO {

    private List<Answer> answerList;
}