package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.request.RegisterReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.mapper.UsersMapper;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import com.spaghettiCoders.klubber.common.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;
    private final UsersMapper usersMapper;
    private final DaoAuthenticationProvider authenticationProvider;
    private final PasswordEncoder passwordEncoder;

    public String signup(RegisterReqDTO registerReqDTO) {
        if (usersRepository.existsByUsername(registerReqDTO.getUsername())) {
            return "This username is already exits!";
        }

        if (usersRepository.existsByEmail(registerReqDTO.getEmail())) {
            return "This email is already exits!";
        }

        registerReqDTO.setPassword(passwordEncoder.encode(registerReqDTO.getPassword()));
        Users newUser = usersMapper.mapToEntity(registerReqDTO);
        newUser.setRole(Role.MEMBER);
        usersRepository.save(newUser);

        return "New user added to the system successfully";
    }

    public LoginResDTO login(LoginReqDTO loginReqDTO) {
        if (!usersRepository.existsByUsername(loginReqDTO.getUsername())) {
            return null;
        }

        Authentication usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginReqDTO.getUsername(), loginReqDTO.getPassword());
        Authentication user = authenticationProvider.authenticate(usernamePasswordAuthenticationToken);
        Users userFromDB = usersRepository.findByUsername(loginReqDTO.getUsername());


        return new LoginResDTO(userFromDB.getName(), userFromDB.getSurname(),
                userFromDB.getUsername(), userFromDB.getEmail(), userFromDB.getRole());
    }

}
