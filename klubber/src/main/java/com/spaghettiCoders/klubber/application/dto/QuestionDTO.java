package com.spaghettiCoders.klubber.application.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spaghettiCoders.klubber.application.entity.Answer;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
public class QuestionDTO {

    private long id;

    private String question;

    private List<AnswerDTO> answerDTOList;


}
