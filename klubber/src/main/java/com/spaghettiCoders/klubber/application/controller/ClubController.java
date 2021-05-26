package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.dto.ClubDTO;
import com.spaghettiCoders.klubber.application.dto.UserDTO;
import com.spaghettiCoders.klubber.application.dto.request.JoinClubReqDTO;
import com.spaghettiCoders.klubber.application.entity.Question;
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

    @PostMapping("/createclub/{username}")
    @PreAuthorize("permitAll()")
    public String createClub(@Valid @RequestBody final Club club, @PathVariable String username) {
        return clubService.createClub(club, username);
    }

    @DeleteMapping("/deleteclub/{name}/{username}")
    @PreAuthorize("permitAll()")
    public String deleteClub(@PathVariable String username, @PathVariable String name) {
        return clubService.deleteClub(username, name);
    }

    @GetMapping("/listclub")
    @PreAuthorize("permitAll()")
    public List<ClubDTO> listClub() {
        return clubService.listClub();
    }


//    @PostMapping("/updateclubname")
//    @PreAuthorize("permitAll()")
//    public String updateClubName(@Valid @RequestBody final Club club, final Users user, final String newName) {
//        return clubService.updateClubName(club, user, newName);
//    }

    @PostMapping("/updateclub/{name}/{username}")
    @PreAuthorize("permitAll()")
    public String updateClubName(@Valid @RequestBody final ClubDTO club, @PathVariable String name, @PathVariable String username) {
        return clubService.updateClubName(club, name, username);
    }

    @PostMapping("/updateclubid/{id}")
    @PreAuthorize("permitAll()")
    public String updateClubId(@Valid @RequestBody final Club club, final Users user, @PathVariable Long id) {
        return clubService.updateClubId(club, user, id);
    }

    @PostMapping("/joinclub")
    @PreAuthorize("permitAll()")
    public String joinClub(@Valid @RequestBody JoinClubReqDTO joinclubReqDTO){
        return clubService.joinClub(joinclubReqDTO);
    }

    @PostMapping("/leaveclub/{clubname}/{username}")
    @PreAuthorize("permitAll()")
    public String leaveClub(@PathVariable String clubname, @PathVariable String username){
        return clubService.leaveClub(clubname, username);
    }

    @GetMapping("/getclubusers/{clubname}")
    @PreAuthorize("permitAll()")
    public List<UserDTO> getUsers(@PathVariable String clubname) {
        return clubService.getUsers(clubname);
    }

    /*@PostMapping("/searchclub")
    @PreAuthorize("permitAll()")
    public String searchClub(@Valid @RequestBody final Club club) {
        return clubService.searchClub(club);
    }*/
}
