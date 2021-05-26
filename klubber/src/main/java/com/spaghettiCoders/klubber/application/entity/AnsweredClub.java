package com.spaghettiCoders.klubber.application.entity;


import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class AnsweredClub extends BaseEntity {
    @Column(name = "username")
    @NonNull
    private String username;

    @Column(name = "club_name")
    @NonNull
    private String clubName;
}
