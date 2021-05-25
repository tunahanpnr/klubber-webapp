package com.spaghettiCoders.klubber.application.dto.request;

import com.spaghettiCoders.klubber.application.entity.Answer;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class JoinClubReqDTO {
    String clubname;
    String username;
    List<Answer> answers;
}
