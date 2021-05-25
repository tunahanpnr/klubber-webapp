package com.spaghettiCoders.klubber.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Question extends BaseEntity {
    @Column(name = "question")
    @NonNull
    private String question;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "question_id")
    @JsonIgnore
    private List<Answer> answers = new ArrayList<>();

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "club_id")
    private Club club;

}
