package com.spaghettiCoders.klubber.application.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
public class AnswerDTO {
    private long id;
    private String answer;
    private int score;
}
