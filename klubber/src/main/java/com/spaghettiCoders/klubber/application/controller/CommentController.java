package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.entity.Comment;
import com.spaghettiCoders.klubber.application.service.ClubService;
import com.spaghettiCoders.klubber.application.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping("/sendComment")
    @PreAuthorize("permitAll()")
    public String sendComment(@Valid @RequestBody final Comment comment) {
        return commentService.sendComment(comment);
    }

    @GetMapping("/getComments/{clubName}")
    @PreAuthorize("permitAll()")
    public List<Comment> getComments(@PathVariable String clubName) {
        return commentService.getComments(clubName);
    }


}
