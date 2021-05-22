package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {

}
