package com.spaghettiCoders.klubber.application.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SubClubCreateReqDTO {
    String clubName;
    String subClubName;
    String creator;
    String admin;
}
