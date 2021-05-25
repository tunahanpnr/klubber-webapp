package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Rate;
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

    public String deleteSubClub(Users user, Long id){
        if(!user.getRole().equals("ADMIN")){

            return "Only users with the role of ADMIN can delete a subclub!";
        }
        if(!subClubRepository.existsById(id)){

            return "subclub not found!";
        }
        subClubRepository.deleteById(id);

        return "subclub deleted from the system successfully";
    }

    public String updateSubClubName(SubClub subclub, Users user, String newName){
        if(!user.getRole().toString().equals("ADMIN")){

            return "Only users with the role of ADMIN can open a club!";
        }
        if(subClubRepository.existsSubClubByName(newName)) {

            return "this subclub is already exist!";
        }

        if(containsIllegals(subclub.getName())){

            return "SubClub Name can not contain illegal character such as \"@ ? ! | ~ ^ € % &\"";
        }
        subclub.setName(newName);

        return "SubClub updated sucessfully.";
    }

    public String updateSubClubId(SubClub subclub, Users user, Long id){
        if(!user.getRole().toString().equals("ADMIN")){

            return "Only users with the role of ADMIN can open a club!";
        }
        if(!subClubRepository.existsById(subclub.getId())){

            return "subclub can not found!";
        }
        if(subClubRepository.existsById(id)){

            return "this id used for another subclub!";
        }if(!idChecker(String.valueOf(id))){
            return "subclud id can contain only numbers.";
        }
        subclub.setId(id);


        return "SubClub updated sucessfully.";
    }

    public List<SubClub> listSubClub(String clubName){
        return subClubRepository.getSubClub(clubName);
    }

    public String joinSubClub(SubClub subclub, Users user){
        List<Users> temporaryClubUsers = subclub.getClub().getUsers();
        List<Users> temporarySubClubUsers = subclub.getUsers();
        List<SubClub> temporaryUserSubClubs = user.getSubClubs();

        if(subclub.getUsers().contains(user)){
            return "User already joined club.";
        }

        if(!temporaryClubUsers.contains(user)){
            return "Since the user is not in the club, user cannot join the subclub.";
        }

        temporarySubClubUsers.add(user);
        subclub.setUsers(temporarySubClubUsers);

        temporaryUserSubClubs.add(subclub);
        user.setSubClubs(temporaryUserSubClubs);
        return "Joined subclub successfully.";
    }

    public String leaveSubClub(SubClub subClub, Users user){
        List<Users> temporarySubClubUsers = subClub.getUsers();
        List<SubClub> temporaryUserSubClubs = user.getSubClubs();

        if(!temporarySubClubUsers.contains(user)){
            return "user not found.";
        }

        temporarySubClubUsers.remove(user);
        subClub.setUsers(temporarySubClubUsers);

        temporaryUserSubClubs.remove(subClub);
        user.setSubClubs(temporaryUserSubClubs);

        return "leaved subclub successfully.";
    }

    public boolean containsIllegals(String toExamine) {
        Pattern pattern = Pattern.compile("[~#@*+%{}<>\\[\\]|\"\\_^]");
        Matcher matcher = pattern.matcher(toExamine);
        return matcher.find();
    }

    public boolean idChecker(String toExamine) {
        Pattern pattern = Pattern.compile("[0123456789]");
        Matcher matcher = pattern.matcher(toExamine);
        return matcher.find();
    }

}

