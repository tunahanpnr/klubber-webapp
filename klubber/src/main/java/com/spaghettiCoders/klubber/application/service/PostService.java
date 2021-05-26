package com.spaghettiCoders.klubber.application.service;


import com.spaghettiCoders.klubber.application.dto.request.CreatePostReqDTO;
import com.spaghettiCoders.klubber.application.entity.Post;
import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.PostRepository;
import com.spaghettiCoders.klubber.application.repository.SubClubRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final SubClubRepository subClubRepository;
    private final UsersRepository usersRepository;

    public String createPost(CreatePostReqDTO createPostReqDTO){
        SubClub subClub = subClubRepository.findByName(createPostReqDTO.getSubClubName());
        if(subClub == null)
            return "Subclub doesn't exist!";

        Users user = usersRepository.findByUsername(createPostReqDTO.getUsername());
        if(user == null)
            return "User doesn't exist!";

        if(!subClub.getUsers().contains(user))
            return "Only sub club users can send post.";

        Post post = new Post();
        post.setUser(user);
        post.setSubClub(subClub);
        post.setContent(createPostReqDTO.getContent());

        postRepository.save(post);

        return "New post added.";
    }

    /*public String createPost(UserDTO userDTO, SubClub subClub, PostDTO postDTO){
        Post post = new Post();
        List<Post> usersPostList = user.getPostList();
        List<Post> subClubPostList = subClub.getPostList();

        if(!subClub.getUsers().contains(user)){
            return "Only sub club users can send post.";
        }

        post.setContent(content);
        post.setUser(user);
        post.setSubClub(subClub);

        usersPostList.add(post);
        user.setPostList(usersPostList);

        subClubPostList.add(post);
        subClub.setPostList(subClubPostList);

        postRepository.save(post);

        return "New post added.";
    }*/

    public Post getPost(Long postId){
        if(!postRepository.existsById(postId)){
            return null;
        }
        return postRepository.getOne(postId);
    }

    public String deletePost(Users user, SubClub subClub, Long postId){
        /*List<Post> usersPostList = user.getPost();
        List<Post> subClubPostList = subClub.getPostList();*/

        if(!(postRepository.getOne(postId).getUser().getId() == user.getId()  || subClub.getAdmin().getId() == user.getId())){
            return "You can not delete this post.";
        }

        /*usersPostList.remove(postRepository.getOne(postId));

        subClubPostList.remove(postRepository.getOne(postId));*/

        postRepository.deleteById(postId);

        return "Post deleted successfully.";
    }


}
