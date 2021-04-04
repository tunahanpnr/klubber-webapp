package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;

    public String createClub(Club club){
        clubRepository.save(club);

        return "club added to the system successfully";
    }

    public String deleteClub(Club club){
        clubRepository.delete(club);

        return "club deleted from the system successfully";
    }

    public List<Club> listClub(){
        return clubRepository.findAll();
    }

    /*public String searchClub(Club club){  TAM İSİM BEKLENMEKSİZİN BENZER İSİMLER İÇEREN KULÜPLERİ GETİRECEK.
        Club dbClub = clubRepository.findClubByName(club.getName());

        if(dbClub == null)
            return "There is not a club such as " + club.getName();

        return dbClub.getName() + " " + dbClub.getSubClubs();
    }*/
}
