package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.SubClubDTO;
import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.mapper.UsersMapper;
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
    private final UsersMapper usersMapper;

    public List<UserDTO> getAllUsers() {
        List<Users> users = usersRepository.findAll();
        List<UserDTO> userDTOS = usersMapper.mapToDto(users);

        return userDTOS;
    }

    public List<Club> getClubs(String username){
        if(usersRepository.existsByUsername(username)){
            return usersRepository.findByUsername(username).getClubs();
        }
        return null;
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
}
