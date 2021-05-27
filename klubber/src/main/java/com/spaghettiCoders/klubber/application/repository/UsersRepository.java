package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UsersRepository extends JpaRepository<Users, Long> {
    @Query("FROM Users u WHERE u.enabled = true and u.username = :username")
    Users findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query("SELECT u FROM Users u WHERE u.verificationCode = :code")
    Users findByVerificationCode(String code);

    @Query("SELECT u FROM Users u WHERE u.enabled = true")
    List<Users> findAll();
}
