package com.spaghettiCoders.klubber.application.entity;

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
public class SubClub extends BaseEntity {
    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "average_score")
    private Double averageScore = 0.0;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "club_id")
    private Club club;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "subclub_id")
    private List<Post> postList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "subclub_id")
    private List<Rate> rateList = new ArrayList<>();

    @ManyToMany(mappedBy = "subClubs")
    private List<Users> users = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "admin_id")
    private Users admin;
}
