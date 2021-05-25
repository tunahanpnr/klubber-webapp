package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Question;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionsRepository;

    public String createQuestions(Question questions) {
        questionsRepository.save(questions);
        return "Question has been created.";
    }

    public String deleteQuestions(Long id) {
        if (!questionsRepository.existsById(id)) {
            return "Question can't be found.";
        }

        questionsRepository.deleteById(id);
        return "Question has been deleted.";
    }

    public List<Question> getQuestions(String clubName) {
        if(!clubRepository.existsClubByName(clubName))
            return null;

        Club club = clubRepository.getClubByName(clubName);

        return club.getQuestions();
    }
}
