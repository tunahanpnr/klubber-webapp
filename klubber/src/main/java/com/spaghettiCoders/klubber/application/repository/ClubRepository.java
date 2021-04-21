package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ClubRepository extends JpaRepository<Club, Long> {
    boolean existsClubByName(String clubName);

    @Query("select club from Club club")
    List<Club> getClubs();
    


}

