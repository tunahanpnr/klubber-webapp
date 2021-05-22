package com.spaghettiCoders.klubber.application.controller;


import com.spaghettiCoders.klubber.application.dto.request.AnswersSelectionReqDTO;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answersService;

    @PostMapping("/selectanswer")
    @PreAuthorize("permitAll()")
    public void setUserAnswers(@Valid @RequestBody final Club club,
                                 final Users user,
                                 AnswersSelectionReqDTO answersSelectionReqDTO){
        answersService.setUserAnswers(club, user, answersSelectionReqDTO);
    }

}