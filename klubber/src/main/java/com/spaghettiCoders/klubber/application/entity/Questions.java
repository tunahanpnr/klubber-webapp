package com.spaghettiCoders.klubber.application.entity;

import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Questions extends BaseEntity {
    @Column(name = "question")
    @NonNull
    private String question;

    private String a;
    private String b;
    private String c;
    private String d;

}
