package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Questions;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionsRepository;

    public String createQuestions(Questions questions, Users user) {
//        if(!user.getRole().toString().equals("ADMIN")) {
//
//            return "Questions can only be created by the club admins.";
//        }

        questionsRepository.save(questions);

        return "Question has been created.";
    }

    public String getQuestions(Questions questions) {
        questionsRepository.findById(questions.getId());

        return "Question is found. ? ";
    }
}
