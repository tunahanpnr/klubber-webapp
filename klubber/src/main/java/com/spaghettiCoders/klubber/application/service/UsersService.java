package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.mapper.UsersMapper;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    private final UsersMapper usersMapper;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public List<Club> getClubs(String username){
        if(usersRepository.existsByUsername(username)){
            return usersRepository.findByUsername(username).getClubs();
        }
        return null;
    }

    public UserDTO getInfoFromUser(String username) {
        if(!usersRepository.existsByUsername(username)) {
            return null;
        }
        Users user = usersRepository.findByUsername(username);
        return usersMapper.mapToDto(user);
    }

    public String reportUser(Users user, String username) {
        if(!usersRepository.existsByUsername(username)) {
            return "This user can't be found!";
        }
        Users toBeReported = usersRepository.findByUsername(username);
        List<Club> toBeReportedClubs = toBeReported.getClubs();

        int currentReportCount = toBeReported.getReportCount();

        for (Club club: toBeReportedClubs) {
            if (user.getClubs().contains(club)) {
                toBeReported.setReportCount(currentReportCount + 1);
                if (toBeReported.getReportCount() == 5) {
                    usersRepository.deleteById(toBeReported.getId());
                    return "Reported user has been banned!";
                }
                return "User has been reported!";
            }
        }
        return "User and reported user are not in the same club.";
    }
}
