package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.request.RegisterReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.mapper.UsersMapper;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import com.spaghettiCoders.klubber.common.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;
    private final UsersMapper usersMapper;


    public String signup(RegisterReqDTO registerReqDTO) {


        if (usersRepository.existsByUsername(registerReqDTO.getUsername())) {
            return "This username is already exits!";
        }

        if (usersRepository.existsByEmail(registerReqDTO.getEmail())) {
            return "This email is already exits!";
        }

        Users newUser = usersMapper.mapToEntity(registerReqDTO);
        newUser.setRole(Role.MEMBER);
        usersRepository.save(newUser);

        return "New user added to the system successfully";
    }

    public LoginResDTO login(LoginReqDTO loginReqDTO) {
        if (!usersRepository.existsByUsername(loginReqDTO.getUsername())) {
            return null;
        }

        Users user = usersRepository.findByUsername(loginReqDTO.getUsername());

        if(!user.getPassword().equals(loginReqDTO.getPassword()))
            return null;

        return new LoginResDTO(user.getName(), user.getSurname(), user.getUsername(), user.getEmail(), user.getRole());
    }

}
