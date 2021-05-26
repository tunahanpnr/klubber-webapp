package com.spaghettiCoders.klubber.application.entity;

import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Post extends BaseEntity {

    @Column(name = "content")
    private String content = "";

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "subclub_id")
    private SubClub subClub;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private Users user;
}
