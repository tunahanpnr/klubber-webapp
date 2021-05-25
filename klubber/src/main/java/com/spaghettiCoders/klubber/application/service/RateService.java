package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Rate;
import com.spaghettiCoders.klubber.application.entity.SubClub;
import com.spaghettiCoders.klubber.application.entity.Users;
import com.spaghettiCoders.klubber.application.repository.RateRepository;
import com.spaghettiCoders.klubber.application.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class RateService {
    private final RateRepository rateRepository;
    private final UsersRepository usersRepository;

    public String createRate(Rate rate, String username){
        Users user =  usersRepository.findByUsername(username);

        SubClub subClub = rate.getSubClub();

        List<Rate> usersRateList = user.getRateList();
        List<Rate> subClubRateList = subClub.getRateList();

        if(!user.getSubClubs().contains(rate.getSubClub())){
            return "You can only rate a subclub you are a member of.";
        }

        usersRateList.add(rate);
        user.setRateList(usersRateList);

        subClubRateList.add(rate);
        subClub.setRateList(subClubRateList);

        rateRepository.save(rate);

        subClub.setAverageScore(calculateRate(subClub));

        return "Rate saved successfully.";
    }

    public Double calculateRate(SubClub subClub){
        double sumOfScores = 0.0;
        for(Rate rate: subClub.getRateList()){
            sumOfScores += rate.getScore();
        }

        return sumOfScores/subClub.getRateList().size();
    }
}
