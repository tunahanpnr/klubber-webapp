package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.ClubDTO;
import com.spaghettiCoders.klubber.application.entity.*;
import com.spaghettiCoders.klubber.application.mapper.ClubMapper;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final UsersRepository usersRepository;
    private final ClubMapper clubMapper;

    public String createClub(Club club, String username){
        Users user =  usersRepository.findByUsername(username);

        if(!user.getRole().toString().equals("ADMIN")){
            return "Only users with the role of ADMIN can open a club!";
        }

        if(clubRepository.existsClubByName(club.getName())) {
            return "this club is already exist!";
        }

        if(containsIllegals(club.getName())){
            return "Club Name can not contain illegal character such as \"@ ? ! | ~ ^ € % &\"";
        }

        clubRepository.save(club);

        return "club added to the system successfully";
    }

    public String deleteClub(Users user, Long id){
        if(!user.getRole().toString().equals("ADMIN")){

            return "Only users with the role of ADMIN can delete a club!";
        }
        if(!clubRepository.existsById(id)){

            return "club not found!";
        }

        clubRepository.deleteById(id);

        return "club deleted from the system successfully";
    }

    public String updateClubName(Club club, Users user, String newName){
        if(!user.getRole().toString().equals("ADMIN")){

            return "Only users with the role of ADMIN can open a club!";
        }
        if(clubRepository.existsClubByName(newName)) {

            return "this club is already exist!";
        }

        if(containsIllegals(club.getName())){

            return "Club Name can not contain illegal character such as \"@ ? ! | ~ ^ € % &\"";
        }
        club.setName(newName);

        return "Club updated sucessfully.";
    }

    public String updateClubId(Club club, Users user, Long id){
        if(!user.getRole().toString().equals("ADMIN")){

            return "Only users with the role of ADMIN can open a club!";
        }
        if(!clubRepository.existsById(club.getId())){

            return "club can not found!";
        }
        if(clubRepository.existsById(id)){

            return "this id used for another club!";
        }if(!idChecker(String.valueOf(id))){
            return "clud id can contain only numbers.";
        }
        club.setId(id);


        return "Club updated sucessfully.";
    }

    public List<ClubDTO> listClub(){
        List<Club> clubs = clubRepository.getClubs();
        return clubMapper.mapToDto(clubs);
    }

    public String joinClub(Club club, Users user){
        List<Users> temporaryClubUsers = club.getUsers();
        List<Club> temporaryUserClubs = user.getClubs();
        int userScore = 0;

        for(Answer a: user.getAnswers()){
            for(Question q: club.getQuestions()){
                if(q.getQuestion().equals(a.getAnswer())){
                    userScore += a.getScore();
                }
            }
        }

        if(userScore < club.getRequiredScore()){

            return "User cannot join this club due to required score.";
        }
        if(temporaryUserClubs.contains(club)){
            return "User already joined this club.";
        }

        temporaryClubUsers.add(user);
        club.setUsers(temporaryClubUsers);

        temporaryUserClubs.add(club);
        user.setClubs(temporaryUserClubs);

        return "Joined club successfully.";
    }

    public String leaveClub(Club club, Users user){
        List<Users> temporaryClubUsers = club.getUsers();
        List<Club> temporaryUserClubs = user.getClubs();
        boolean isUserExistAnySubClub = false;

        if(!temporaryClubUsers.contains(user)){
            return "user not found.";
        }

        for(SubClub sb: club.getSubClubs()){
            if(sb.getUsers().contains(user)){
                isUserExistAnySubClub = true;
            }
        }
        if(isUserExistAnySubClub) {
            return "user cannot leave club because user inside one of the Club's SubClub.";
        }

        temporaryClubUsers.remove(user);
        club.setUsers(temporaryClubUsers);

        temporaryUserClubs.remove(club);
        user.setClubs(temporaryUserClubs);

        return "user leaved club successfully.";
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

    /*public String searchClub(Club club){  TAM İSİM BEKLENMEKSİZİN BENZER İSİMLER İÇEREN KULÜPLERİ GETİRECEK.
        Club dbClub = clubRepository.findClubByName(club.getName());

        if(dbClub == null)
            return "There is not a club such as " + club.getName();

        return dbClub.getName() + " " + dbClub.getSubClubs();
    }*/
}

