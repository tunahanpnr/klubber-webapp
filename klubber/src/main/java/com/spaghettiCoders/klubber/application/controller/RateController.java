package com.spaghettiCoders.klubber.application.controller;


import com.spaghettiCoders.klubber.application.entity.Rate;
import com.spaghettiCoders.klubber.application.service.RateService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class RateController {
    private final RateService rateService;

    @PostMapping("/createrate")
    @PreAuthorize("permitAll()")
    public String createRate(@Valid @RequestBody final Rate rate, final String username) {
        return rateService.createRate(rate, username);
    }
}
