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
public class Users extends BaseEntity {
    @Column(name = "name")
    @NonNull
    private String name;

    @Column(name = "surname")
    @NonNull
    private String surname;

    @Column(name = "email", unique = true)
    @NonNull
    private String email;

    @Column(name = "username", unique = true)
    @NonNull
    private String username;

    @Column(name = "password")
    @NonNull
    private String password;

    @ManyToMany(mappedBy = "users")
    private List<Club> clubs = new ArrayList<>();

    @ManyToMany(mappedBy = "users")
    private List<SubClub> subClubs = new ArrayList<>();

    @OneToOne(mappedBy = "admin", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false)
    private SubClub subClub;

//    @Column(name = "role")
//    @Enumerated(EnumType.STRING)
//    private ROLE role;
}
