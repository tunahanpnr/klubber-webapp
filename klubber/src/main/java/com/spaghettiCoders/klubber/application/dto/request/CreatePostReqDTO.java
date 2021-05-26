package com.spaghettiCoders.klubber.application.dto.request;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CreatePostReqDTO {
    String content;
    String username;
    String subClubName;
}
