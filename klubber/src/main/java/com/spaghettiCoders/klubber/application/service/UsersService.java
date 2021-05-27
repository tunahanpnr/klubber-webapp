package com.spaghettiCoders.klubber.application.service;


import com.spaghettiCoders.klubber.application.dto.ClubDTO;
import com.spaghettiCoders.klubber.application.dto.SubClubDTO;
import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;

import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.mapper.ClubMapper;
import com.spaghettiCoders.klubber.application.mapper.UsersMapper;

import com.spaghettiCoders.klubber.application.repository.AnsweredClubRepository;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    private final ClubRepository clubRepository;
    private final AnsweredClubRepository answeredClubRepository;
    private final UsersMapper usersMapper;
    private final ClubMapper clubMapper;

    public List<UserDTO> getAllUsers() {

        return usersMapper.mapToDto(usersRepository.findAll());

    }

    public List<Club> getClubs(String username){
        if(usersRepository.existsByUsername(username)){
            return usersRepository.findByUsername(username).getClubs();
        }
        return null;
    }



    public UserDTO getInfoFromUser(String username) {
        Users user = usersRepository.findByUsername(username);
        if(user ==null){
            return null;
        }
        UserDTO userDTO = usersMapper.mapToDto(user);
        return userDTO;
    }

    public UserDTO getUser(String username) {
        Users user = usersRepository.findByUsername(username);
        if(user ==null){
            return null;
        }
        UserDTO userDTO = usersMapper.mapToDto(user);
        return userDTO;
    }

    public String reportUser(Users user, String username) {
        if(!usersRepository.existsByUsername(username)) {
            return "This user can't be found!";
        }

        Users currentUser = usersRepository.findByUsername(user.getUsername());
        Users toBeReported = usersRepository.findByUsername(username);
        List<Club> toBeReportedClubs = toBeReported.getClubs();

        int currentReportCount = toBeReported.getReportCount();

        for (Club club: toBeReportedClubs) {
            if (currentUser.getClubs().contains(club)) {
                toBeReported.setReportCount(currentReportCount + 1);
                if (toBeReported.getReportCount() == 5) {
                    toBeReported.setEnabled(false);
                    usersRepository.save(toBeReported);
                    return "Reported user has been banned!";
                }
                usersRepository.save(toBeReported);
                return "User has been reported!";
            }
        }
        return "User and reported user are not in the same club.";
    }
  
    public List<SubClubDTO> getMySubClubs(String username) {
        Users user = usersRepository.findByUsername(username);
        if(user == null)
            return null;

        List<SubClubDTO> subClubDTOList = new ArrayList<>();
        for (SubClub subClub:user.getSubClubs()) {
            SubClubDTO subClubDTO = new SubClubDTO();
            subClubDTO.setName(subClub.getName());
            subClubDTO.setClubName(subClub.getClub().getName());
            subClubDTO.setAdmin(subClub.getAdmin().getUsername());
            subClubDTOList.add(subClubDTO);
        }

        return subClubDTOList;

    }

    public List<ClubDTO> getMyClubs(String username) {
        Users user = usersRepository.findByUsername(username);
        if (user == null)
            return null;

        return clubMapper.mapToDto(user.getClubs());
    }

    public List<ClubDTO> getAvailableClubs(String username) {
        Users user = usersRepository.findByUsername(username);
        if (user == null)
            return null;


        List<Club> clubs = clubRepository.getClubs();
        List<Club> joined = user.getClubs();
        List<Club> answered = clubRepository.myAnsweredClubs(username);
        clubs.removeAll(joined);
        clubs.removeAll(answered);

        return clubMapper.mapToDto(clubs);
    }
}
