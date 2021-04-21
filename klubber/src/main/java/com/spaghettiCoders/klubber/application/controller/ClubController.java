package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.entity.Club;
import com.spaghettiCoders.klubber.application.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ClubController {
    private final ClubService clubService;

    @PostMapping("/createclub")
    @PreAuthorize("permitAll()")
    public String createClub(@Valid @RequestBody final Club club, final Users user) {
        return clubService.createClub(club, user);
    }

    @DeleteMapping("/deleteclub")
    @PreAuthorize("permitAll()")
    public String deleteClub(@Valid @RequestBody final Club club, final Users user) {
        return clubService.deleteClub(club, user);
    }

    @GetMapping("/listclub")
    @PreAuthorize("permitAll()")
    public List<Club> listClub() {
        return clubService.listClub();
    }

    /*@PostMapping("/searchclub")
    @PreAuthorize("permitAll()")
    public String searchClub(@Valid @RequestBody final Club club) {
        return clubService.searchClub(club);
    }*/
}

