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
import org.apache.catalina.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;
    private final UsersMapper usersMapper;

    public List<UserDTO> getAllUsers() {
        return usersMapper.mapToDto(usersRepository.findAll()) ;
    }

    public List<Club> getClubs(String username){
        if(usersRepository.existsByUsername(username)){
            return usersRepository.findByUsername(username).getClubs();
        }
        return null;
    }

    public UserDTO getUser(String username) {
        Users user = usersRepository.findByUsername(username);
        if(user ==null){
            return null;
        }
        UserDTO userDTO = usersMapper.mapToDto(user);
        return userDTO;
    }
}
