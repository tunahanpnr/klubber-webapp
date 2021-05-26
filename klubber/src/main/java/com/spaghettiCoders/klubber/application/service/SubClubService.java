package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.SubClubDTO;
import com.spaghettiCoders.klubber.application.dto.request.SubClubCreateReqDTO;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import com.spaghettiCoders.klubber.application.repository.SubClubRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class SubClubService {
    private final ClubRepository clubRepository;
    private final SubClubRepository subClubRepository;
    private final UsersRepository usersRepository;


    public String createSubClub(SubClubCreateReqDTO subclub){
        if(!usersRepository.existsByUsername(subclub.getCreator()))
            return "creator not exist!";

        if(!usersRepository.existsByUsername(subclub.getAdmin()))
            return "creator not exist!";

        Users creator = usersRepository.findByUsername(subclub.getCreator());
        Users admin = usersRepository.findByUsername(subclub.getAdmin());

        if(!creator.getRole().toString().equals("ADMIN"))
            return "Only users with the role of ADMIN can open a subclub!";

        if(!creator.getRole().toString().equals("ADMIN"))
            return "Only users with the role of ADMIN can open a subclub!";

        if(!clubRepository.existsClubByName(subclub.getClubName()))
            return "parent club is not exist!";

        if(subClubRepository.existsSubClubByName(subclub.getSubClubName()))
            return "this subclub is already exist!";

        if(containsIllegals(subclub.getSubClubName()))
            return "SubClub Name can not contain illegal character such as \"@ ? ! | ~ ^ € % &\"";

        SubClub newSubClub = new SubClub();
        newSubClub.setName(subclub.getSubClubName().toLowerCase());
        newSubClub.setAdmin(admin);
        newSubClub.setClub(clubRepository.getClubByName(subclub.getClubName()));
        subClubRepository.save(newSubClub);

        return "subclub added to the system successfully";
    }

    public String deleteSubClub(String username, String name){
        Users user = usersRepository.findByUsername(username);

        if(!user.getRole().toString().equals("ADMIN")){

            return "Only users with the role of ADMIN can delete a subclub!";
        }
        if(!subClubRepository.existsSubClubByName(name)){

            return "subclub not found!";
        }
        SubClub subclub = subClubRepository.findByName(name);

        subClubRepository.delete(subclub);

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

    public List<SubClubDTO> listSubClub(String clubName){
        Club club = clubRepository.getClubByName(clubName);
        if(club == null)
            return null;

        List<SubClubDTO> subclubs = new ArrayList<>();
        for (SubClub s: club.getSubClubs()) {
            SubClubDTO subClubDTO = new SubClubDTO();
            subClubDTO.setAdmin(s.getAdmin().getUsername());
            subClubDTO.setName(s.getName());
            subClubDTO.setClubName(clubName);
            subclubs.add(subClubDTO);
        }
        return subclubs;
    }

//    public List<ClubDTO> listClub(){
//        List<Club> clubs = clubRepository.getClubs();
//        return clubMapper.mapToDto(clubs);
//    }

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

