package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.request.RegisterReqDTO;
import com.spaghettiCoders.klubber.application.dto.request.ChangePasswordReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.mapper.UsersMapper;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import com.spaghettiCoders.klubber.common.enums.Role;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsersRepository usersRepository;
    private final UsersMapper usersMapper;
    private final DaoAuthenticationProvider authenticationProvider;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public String signup(RegisterReqDTO registerReqDTO) {
        if(registerReqDTO.getUsername().equals(""))
            return "Username cant be null!";

        if(registerReqDTO.getEmail().equals(""))
            return "Email cant be null!";

        if(registerReqDTO.getPassword().equals(""))
            return "Password cant be null!";

        if (usersRepository.existsByUsername(registerReqDTO.getUsername())) {
            return "This username is already exits!";
        }

        if (usersRepository.existsByEmail(registerReqDTO.getEmail())) {
            return "This email is already exits!";
        }

        registerReqDTO.setPassword(passwordEncoder.encode(registerReqDTO.getPassword()));
        Users newUser = usersMapper.mapToEntity(registerReqDTO);
        String randomCode = RandomString.make(64);
        newUser.setVerificationCode(randomCode);
        newUser.setEnabled(false);
        newUser.setRole(Role.MEMBER);
        newUser.setReportCount(0);

        usersRepository.save(newUser);

        emailService.sendVerificationEmail(newUser);

        return "New user added to the system successfully";
    }

    public LoginResDTO login(LoginReqDTO loginReqDTO) {
        if (!usersRepository.existsByUsername(loginReqDTO.getUsername())) {
            return null;
        }
        Users userFromDB = usersRepository.findByUsername(loginReqDTO.getUsername());

        if (!userFromDB.isEnabled())
            return null;


        Authentication usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginReqDTO.getUsername(), loginReqDTO.getPassword());
        Authentication user = authenticationProvider.authenticate(usernamePasswordAuthenticationToken);

        return new LoginResDTO(userFromDB.getName(), userFromDB.getSurname(),
                userFromDB.getUsername(), userFromDB.getEmail(), userFromDB.getRole());
    }

    public String verify(String token) {
        Users user = usersRepository.findByVerificationCode(token);

        if (user == null)
            return "User not found";

        if (user.isEnabled())
            return "User already verified";

        user.setEnabled(true);
        usersRepository.save(user);

        return "User verified successfully";
    }

    public boolean isUserExist(String username) {
        return usersRepository.existsByUsername(username);
    }

    public String updateProfile(RegisterReqDTO registerReqDTO, String username) {
        Users currentUser = usersRepository.findByUsername(username);

        if (!currentUser.getUsername().equals(registerReqDTO.getUsername())) {
            if (usersRepository.existsByUsername(registerReqDTO.getUsername())) {
                return "This username is already exits!";
            }
            currentUser.setUsername(registerReqDTO.getUsername());
        }

        if (!currentUser.getEmail().equals(registerReqDTO.getEmail())) {
            if (usersRepository.existsByUsername(registerReqDTO.getUsername()))
                return "This email is already exits!";

            currentUser.setEmail(registerReqDTO.getEmail());
        }

        currentUser.setName(registerReqDTO.getName());
        currentUser.setSurname(registerReqDTO.getSurname());

        usersRepository.save(currentUser);

        return "Your profile updated successfully";
    }

    public String changePassword(ChangePasswordReqDTO changePasswordReqDTO, String username) {
        if (!usersRepository.existsByUsername(username))
            return "Wrong username!";

        Users currentUser = usersRepository.findByUsername(username);

        Authentication usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, changePasswordReqDTO.getOldPassword());
        Authentication user = authenticationProvider.authenticate(usernamePasswordAuthenticationToken);

        currentUser.setPassword(passwordEncoder.encode(changePasswordReqDTO.getNewPassword()));
        usersRepository.save(currentUser);

        return "Your password changed successfully";
    }
}
