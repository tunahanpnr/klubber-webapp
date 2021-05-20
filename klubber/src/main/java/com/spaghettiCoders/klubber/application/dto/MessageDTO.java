package com.spaghettiCoders.klubber.application.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private String message;

    private String sender;

    private String receiver;

    private LocalDateTime sendDate;
}
