package com.spaghettiCoders.klubber.application.entity;

import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Answer extends BaseEntity {

    @ManyToOne(cascade = CascadeType.ALL)
    private Question question;

    @Column(name = "answer")
    private String answer;

    @Column(name = "score")
    private int score;

    @ManyToMany(mappedBy = "answers")
    private List<Users> users = new ArrayList<>();
}