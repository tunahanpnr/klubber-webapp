package com.spaghettiCoders.klubber.application.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PostDTO {
    String content;
    String username;
    String subClubName;
}
