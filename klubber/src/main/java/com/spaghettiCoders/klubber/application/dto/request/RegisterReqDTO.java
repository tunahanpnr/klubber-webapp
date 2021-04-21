package com.spaghettiCoders.klubber.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RegisterReqDTO{
    private String name;

    private String surname;

    private String email;

    private String username;

    private String password;
}
