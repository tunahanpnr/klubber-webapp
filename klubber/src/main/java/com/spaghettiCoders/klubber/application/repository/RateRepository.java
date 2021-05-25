package com.spaghettiCoders.klubber.application.repository;

import com.spaghettiCoders.klubber.application.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RateRepository extends JpaRepository<Rate, Long> {
}
