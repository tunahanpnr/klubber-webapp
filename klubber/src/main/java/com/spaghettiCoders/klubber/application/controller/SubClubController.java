package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.service.SubClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class SubClubController {
    private final SubClubService subClubService;

    @PostMapping("/createsubclub")
    @PreAuthorize("permitAll()")
    public String createSubClub(@Valid @RequestBody final SubClub subclub, final Users user) {
        return subClubService.createSubClub(subclub, user);
    }

    @DeleteMapping("/deletesubclub")
    @PreAuthorize("permitAll()")
    public String deleteSubClub(@Valid @RequestBody final SubClub subclub, final Users user) {
        return subClubService.deleteSubClub(subclub, user);
    }

    @GetMapping("/listsubclub")
    @PreAuthorize("permitAll()")
    public List<SubClub> listSubClub(@Valid @RequestBody final String clubName){
        return subClubService.listSubClub(clubName);
    }
}
