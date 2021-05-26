package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.dto.SubClubDTO;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.service.UsersService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UsersController {
    private final UsersService usersService;

    @GetMapping("/fetchusers")
    @PreAuthorize("permitAll()")
    public List<UserDTO> getAllUsers() {
        return usersService.getAllUsers();
    }

    @GetMapping("/getuser/{username}")
    @PreAuthorize("permitAll()")
    public UserDTO getInfoFromUser(@PathVariable String username) {
        return usersService.getInfoFromUser(username);
    }

    @PostMapping("/reportuser/{username}")
    @PreAuthorize("permitAll()")
    public String reportUser(@Valid @RequestBody Users user, @PathVariable String username) {
        return usersService.reportUser(user, username);
    }

    @GetMapping("/getclubs/{username}")
    @PreAuthorize("permitAll()")
    public List<Club> getClubs(@PathVariable String username) { return usersService.getClubs(username); }

    @GetMapping("/getMySubClubs/{username}")
    @PreAuthorize("permitAll()")
    public List<SubClubDTO> getMySubClubs(@PathVariable String username) {
        return usersService.getMySubClubs(username);
    }

}
