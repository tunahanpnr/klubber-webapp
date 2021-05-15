package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.dto.request.LoginReqDTO;
import com.spaghettiCoders.klubber.application.dto.request.RegisterReqDTO;
import com.spaghettiCoders.klubber.application.dto.response.LoginResDTO;
import com.spaghettiCoders.klubber.application.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
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
    public LoginResDTO login(@Valid @RequestBody final LoginReqDTO loginReqDTO) {
        return authService.login(loginReqDTO);
    }

    @PostMapping("/signup")
    @PreAuthorize("permitAll()")
    public String signup(@Valid @RequestBody final RegisterReqDTO registerReqDTO) {
        return authService.signup(registerReqDTO);
    }

    @GetMapping("/verify")
    @PreAuthorize("permitAll()")
    public String verifyUser(@Param("token") String token) {
        return authService.verify(token);
    }

}
