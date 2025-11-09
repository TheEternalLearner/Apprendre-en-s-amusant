package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.SignUpForm;
import com.ensamusant.apprendre.service.MailService;
import org.springframework.stereotype.Controller;

@Controller
public class SignUpFormController {

    private MailService mailService;

    public SignUpFormController(MailService mailService) {
        this.mailService = mailService;
    }

    public SignUpForm createSignUpForm(String firstName, String lastName, String email) {
        SignUpForm form = new SignUpForm();

        form.setFirstName(firstName);
        form.setLastName(lastName);
        form.setEmail(email);

        return form;
    }

    public void processSignUpForm(SignUpForm form) {

    }
}
