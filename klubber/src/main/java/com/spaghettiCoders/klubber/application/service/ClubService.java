package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;

    public String createClub(Club club, Users user){
//        if(!user.getRole().toString().equals("ADMIN")){
//
//            return "Only users with the role of ADMIN can open a club!";
//        }
        if(clubRepository.existsClubByName(club.getName())) {

            return "this club is already exist!";
        }

//        if(containsIllegals(club.getName())){
//
//            return "Club Name can not contain illegal character such as \"@ ? ! | ~ ^ € % &\"";
//        }

        clubRepository.save(club);

        return "club added to the system successfully";
    }

    public String deleteClub(Club club, Users user){
        if(!user.getRole().toString().equals("ADMIN")){

            return "Only users with the role of ADMIN can delete a club!";
        }
        if(!clubRepository.existsClubByName(club.getName())){

            return "club not found!";
        }
        clubRepository.delete(club);

        return "club deleted from the system successfully";
    }

    public List<Club> listClub(){
        return clubRepository.getClubs();
    }


    public boolean containsIllegals(String toExamine) {
        Pattern pattern = Pattern.compile("[~#@*+%{}<>\\[\\]|\"\\_^]");
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
