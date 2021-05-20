package com.spaghettiCoders.klubber.application.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.spaghettiCoders.klubber.common.entity.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@Data
@JsonIgnoreProperties
public class Message extends BaseEntity {
    @Column(name = "message")
    private String message;

    @Column(name = "sender")
    private String sender;

    @Column(name = "receiver")
    private String receiver;

    @Column(name = "send_date")
    private LocalDateTime sendDate;
}
