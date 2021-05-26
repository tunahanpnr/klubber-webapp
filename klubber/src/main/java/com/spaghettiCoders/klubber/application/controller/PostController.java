package com.spaghettiCoders.klubber.application.controller;

import com.spaghettiCoders.klubber.application.dto.request.CreatePostReqDTO;
import com.spaghettiCoders.klubber.application.entity.Post;
import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping("/createpost")
    @PreAuthorize("permitAll()")
    public String createPost(@Valid @RequestBody CreatePostReqDTO createPostReqDTO) {
        return postService.createPost(createPostReqDTO);
    }

    /*@PostMapping("/createpost")
    @PreAuthorize("permitAll()")
    public String createPost(@Valid @RequestBody final UserDTO userDTO, final SubClub subClub, final PostDTO postDTO) {
        return postService.createPost(userDTO, subClub, postDTO);
    }*/

    @GetMapping("/getepost")
    @PreAuthorize("permitAll()")
    public Post getPost(@Valid @RequestBody final Long postId) {
        return postService.getPost(postId);
    }

    @DeleteMapping("/deletepost")
    @PreAuthorize("permitAll()")
    public String deletePost(@Valid @RequestBody final Users user, final SubClub subClub, final Long postId) {
        return postService.deletePost(user, subClub, postId);
    }

}
