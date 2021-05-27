package com.spaghettiCoders.klubber.application.entity;


import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Comment extends BaseEntity {
    private String comment;
    private String club;
    private String username;
}
