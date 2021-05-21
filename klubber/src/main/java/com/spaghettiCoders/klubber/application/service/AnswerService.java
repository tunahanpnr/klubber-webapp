package com.spaghettiCoders.klubber.application.service;


import com.spaghettiCoders.klubber.application.dto.request.AnswersSelectionReqDTO;
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

    public void setUserAnswers(Club club, Users user, AnswersSelectionReqDTO answersSelectionReqDTO){
        List<Answer> userAnswer = user.getAnswers();

        userAnswer.addAll(answersSelectionReqDTO.getAnswerList());

        user.setAnswers(userAnswer);

        int temp = calculateUserScore(club, user);//temp userin scoreunu verir. //gerekli yerde kullanılacaktır.
        //clubService.joinClub(club, user);
    }

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
