package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.SubClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SubClubService {
    private final SubClubRepository subClubRepository;

    public String createSubClub(SubClub subclub, Users user){
        if(!user.getRole().equals("ADMIN")){

            return "Only users with the role of ADMIN can open a subclub!";
        }
        if(subClubRepository.existsSubClubByName(subclub.getName())){

            return "this subclub is already exist!";
        }if(containsIllegals(subclub.getName())){

            return "SubClub Name can not contain illegal character such as \"@ ? ! | ~ ^ € % &\"";
        }
        subClubRepository.save(subclub);

        return "subclub added to the system successfully";
    }

    public String deleteSubClub(SubClub subclub, Users user){
        if(!user.getRole().equals("ADMIN")){

            return "Only users with the role of ADMIN can delete a subclub!";
        }
        if(!subClubRepository.existsSubClubByName(subclub.getName())){

            return "subclub not found!";
        }
        subClubRepository.delete(subclub);

        return "subclub deleted from the system successfully";
    }

    public List<SubClub> listSubClub(String clubName){
        return subClubRepository.getSubClub(clubName);
    }


    public boolean containsIllegals(String toExamine) {
        Pattern pattern = Pattern.compile("[~#@*+%{}<>\\[\\]|\"\\_^]");
        Matcher matcher = pattern.matcher(toExamine);
        return matcher.find();
    }

}

