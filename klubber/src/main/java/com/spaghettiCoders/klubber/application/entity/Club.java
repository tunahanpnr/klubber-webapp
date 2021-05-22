package com.spaghettiCoders.klubber.application.entity;

import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Cleanup;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
public class Club extends BaseEntity {
    @Column(name = "name")
    @NonNull
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "club_id")
    private List<Question> questions;

    @OneToMany(mappedBy = "club")
    private List<SubClub> subClubs;

    @Column(name = "club_score")
    private int requiredScore;

    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "club_user",
            joinColumns = @JoinColumn(name = "club_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Users> users = new ArrayList<>();

}
