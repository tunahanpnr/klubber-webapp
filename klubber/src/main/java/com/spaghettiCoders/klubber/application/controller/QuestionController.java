package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.entity.Questions;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionsService;

    @GetMapping("/getquestions")
    @PreAuthorize("permitAll()")
    public String getQuestions(@Valid @RequestBody final Questions questions) {
        return questionsService.getQuestions(questions);
    }

    @PostMapping("/createquestions")
    @PreAuthorize("permitAll()")
    public String createQuestions(@Valid @RequestBody final Questions questions, Users user) {
        return questionsService.createQuestions(questions, user);
    }

}