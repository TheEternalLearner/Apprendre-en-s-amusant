package com.ensamusant.apprendre.service;

import com.ensamusant.apprendre.model.SignUpForm;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;
    private SimpleMailMessage templateMessage;

    public MailService( JavaMailSender mailSender) {
        this.mailSender = mailSender;
        this.templateMessage = new SimpleMailMessage();
    }


    public void sendMailAfterSignUp(SignUpForm form) {



    }
}
