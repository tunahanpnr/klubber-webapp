package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.service.SubClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class SubClubController {
    private final SubClubService subClubService;

    @PostMapping("/createsubclub")
    @PreAuthorize("permitAll()")
    public String createSubClub(@Valid @RequestBody final SubClub subclub) {
        return subClubService.createSubClub(subclub);
    }
}
