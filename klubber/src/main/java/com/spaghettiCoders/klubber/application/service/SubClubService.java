package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.repository.SubClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubClubService {
    private final SubClubRepository subClubRepository;

    public String createSubClub(SubClub subclub){
        subClubRepository.save(subclub);

        return "subclub added to the system successfully";
    }
}
