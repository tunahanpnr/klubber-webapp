package com.spaghettiCoders.klubber.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LoginReqDTO {
    private String username;
    private String password;
}
