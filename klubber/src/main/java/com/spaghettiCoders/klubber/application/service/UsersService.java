package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsersService {
    private final UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public List<Club> getClubs(String username){
        if(usersRepository.existsByUsername(username)){
            return usersRepository.findByUsername(username).getClubs();
        }
        return null;
    }
}
