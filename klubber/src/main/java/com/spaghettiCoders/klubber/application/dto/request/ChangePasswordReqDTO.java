package com.spaghettiCoders.klubber.application.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChangePasswordReqDTO {
    private String oldPassword;
    private String newPassword;
}
