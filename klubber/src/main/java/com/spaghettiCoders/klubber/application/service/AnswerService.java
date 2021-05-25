package com.spaghettiCoders.klubber.application.service;


import com.spaghettiCoders.klubber.application.entity.Answer;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final ClubService clubService;

    public int calculateUserScore (Club club, Users user){
        int score = 0;
        for(Answer a: user.getAnswers()){
            if(club.getQuestions().contains(a.getQuestion())){
                score += a.getScore();
            }
        }
        return score;
    }

}
