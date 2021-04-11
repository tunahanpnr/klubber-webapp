package com.spaghettiCoders.klubber.application.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserDTO {
    private String name;

    private String surname;

    private String email;

    private String username;
}
