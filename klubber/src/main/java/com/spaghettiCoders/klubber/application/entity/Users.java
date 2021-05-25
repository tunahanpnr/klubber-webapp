package com.spaghettiCoders.klubber.application.entity;

import com.spaghettiCoders.klubber.common.entity.BaseEntity;

import com.spaghettiCoders.klubber.common.enums.Role;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@SequenceGenerator(name = "idgen", sequenceName = "USER_SEQ")
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

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @Column(name = "enabled")
    private boolean enabled;

    @ManyToMany(mappedBy = "users")
    private List<Club> clubs = new ArrayList<>();

    @ManyToMany(mappedBy = "users")
    private List<SubClub> subClubs = new ArrayList<>();

    @ManyToMany(mappedBy = "users")
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "users_id")
    private List<Post> postList = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "users_id")
    private List<Rate> rateList = new ArrayList<>();

    @OneToOne(mappedBy = "admin", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false)
    private SubClub subClub;

}
