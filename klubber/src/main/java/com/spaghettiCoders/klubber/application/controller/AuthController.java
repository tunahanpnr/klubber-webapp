package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signin")
    @PreAuthorize("permitAll()")
    public String login(@Valid @RequestBody final Users user) {
        return authService.login(user);
    }

    @PostMapping("/signup")
    @PreAuthorize("permitAll()")
    public String addUser(@Valid @RequestBody final Users user) {
        return authService.addUser(user);
    }

}
