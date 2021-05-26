package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select m from Message m where (m.sender = :user1  and m.receiver = :user2) or (m.receiver = :user1  and m.sender = :user2)")
    List<Message> getPrivateMessages(String user1, String user2);

    @Query("select m from Message m where m.receiver = :subClub")
    List<Message> getSubClubMessages(String subClub);
}
