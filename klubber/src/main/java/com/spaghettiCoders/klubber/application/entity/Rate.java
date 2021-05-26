package com.spaghettiCoders.klubber.application.entity;

import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
public class Rate extends BaseEntity {
    @Column(name = "comment")
    private String comment;

    @Column(name = "score")
    private Integer score;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Users user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subclub_id")
    private SubClub subClub;
}
