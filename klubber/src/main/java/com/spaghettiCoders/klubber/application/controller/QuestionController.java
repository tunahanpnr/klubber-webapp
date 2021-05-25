package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.entity.Question;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionsService;

    @GetMapping("/getquestions/{clubName}")
    @PreAuthorize("permitAll()")
    public List<Question> getQuestions(@PathVariable String clubName) {
        return questionsService.getQuestions(clubName);
    }

    @PostMapping("/createquestions")
    @PreAuthorize("permitAll()")
    public String createQuestions(@Valid @RequestBody final Question questions) {
        return questionsService.createQuestions(questions);
    }

    @DeleteMapping("/deletequestions/{id]")
    @PreAuthorize("permitAll()")
    public String deleteQuestions(@Valid @RequestBody final Long id) {
        return questionsService.deleteQuestions(id);
    }
}
