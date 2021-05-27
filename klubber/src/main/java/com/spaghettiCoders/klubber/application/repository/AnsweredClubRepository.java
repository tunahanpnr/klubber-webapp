package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.AnsweredClub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnsweredClubRepository extends JpaRepository<AnsweredClub, Long> {
    @Query("select case when (count(a) > 0)  then true else false end FROM AnsweredClub a WHERE a.clubName = :clubName and a.username = :username")
    Boolean isAnswered(String username, String clubName);

}
