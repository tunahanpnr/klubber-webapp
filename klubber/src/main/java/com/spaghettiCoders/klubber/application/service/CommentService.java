package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Comment;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.ClubRepository;
import com.spaghettiCoders.klubber.application.repository.CommentRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UsersRepository usersRepository;
    private final ClubRepository clubRepository;


    public String sendComment(Comment comment) {
        if (!usersRepository.existsByUsername(comment.getUsername()))
            return "Wrong username!";

        if (!clubRepository.existsClubByName(comment.getClub()))
            return "Wrong username!";

        if(comment.getComment().equals(""))
            return "Comment cant be null!";

        commentRepository.save(comment);

        return "Comment send succesfully!";
    }

    public List<Comment> getComments(String clubName) {
        if (!clubRepository.existsClubByName(clubName))
            return null;

        return clubRepository.findAllByClub(clubName);
    }
}
