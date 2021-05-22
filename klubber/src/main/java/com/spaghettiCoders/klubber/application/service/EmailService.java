package com.spaghettiCoders.klubber.application.service;

import com.spaghettiCoders.klubber.application.entity.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
@RequiredArgsConstructor
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationEmail(Users user) {
        String to = user.getEmail();
        String verifyURL = "http://localhost:8080" + "/verify?token=" + user.getVerificationCode();
        String subject = "Please verify your registration";
        String content = "<html>\n"
                + "<body>\n"
                + "\n"
                + "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br><br>"
                + "<h3><a href=\"[[url]]\">\n"
                + "VERIFY</a></h3>\n"
                + "\n"
                + "<br><br>Thank you,<br>"
                + "Klubber."
                + "</body>\n"
                + "</html>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setTo(to);
            helper.setSubject(subject);

            content = content.replace("[[name]]", user.getName());
            content = content.replace("[[url]]", verifyURL);

            helper.setText(content, true);

            mailSender.send(message);
        } catch (Exception e) {
        }
    }
}
