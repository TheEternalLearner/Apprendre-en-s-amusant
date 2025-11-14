package com.ensamusant.apprendre.service;

import com.ensamusant.apprendre.model.SignUpForm;
import org.springframework.mail.MailException;
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
        SimpleMailMessage message = new SimpleMailMessage(this.templateMessage);
        message.setFrom("no-reply@ensamusant.com");
        message.setReplyTo(form.getEmail());
        message.setTo("michael.lanselle@gmail.com");
        message.setSubject("Nouvelle demande d'inscription");
        message.setText(
                "Dear Patty, "
                        + form.getFirstName()
                        + " "
                        + form.getLastName()
                        + " s'est inscrit à un de vos cours !"
        );
        try {
            this.mailSender.send(message);
        } catch (MailException ex) {
            System.err.println(ex.getMessage());
        }

    }
}
