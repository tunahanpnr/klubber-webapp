package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;

    public String addUser(Users users) {

        usersRepository.save(users);

        return "user added to the system successfully";
    }

    public String login(Users user) {
        Users dbUser = usersRepository.findByUsername(user.getUsername());

        if(dbUser == null)
            return "check username";

        if(!dbUser.getPassword().equals(user.getPassword()))
            return "wrong password";

        return "welcome";
    }

}
