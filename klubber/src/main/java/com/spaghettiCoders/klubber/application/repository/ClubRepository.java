package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {
    boolean existsClubByName(String clubName);

    @Query("select club from Club club where club.name = :clubName")
    Club getClubByName(String clubName);

    @Query("select club from Club club")
    List<Club> getClubs();

    @Query("select c FROM Club c, AnsweredClub a where a.username = :username and a.clubName = c.name")
    List<Club> myAnsweredClubs(String username);

    @Query("select c from Comment c where c.club = :clubName")
    List<Comment> findAllByClub(String clubName);
}


