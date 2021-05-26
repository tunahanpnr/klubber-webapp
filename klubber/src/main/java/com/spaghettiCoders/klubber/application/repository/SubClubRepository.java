package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.SubClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubClubRepository extends JpaRepository<SubClub, Long> {
    boolean existsSubClubByName(String subclubName);

    SubClub findByName(String subclubName);

    @Query("select subclub from SubClub subclub where subclub.club.name = :clubName")
    List<SubClub> getSubClub(String clubName);
}

