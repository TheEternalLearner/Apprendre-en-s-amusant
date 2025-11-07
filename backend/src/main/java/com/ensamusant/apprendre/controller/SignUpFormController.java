package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.SignUpForm;
import org.springframework.stereotype.Controller;

@Controller
public class SignUpFormController {

    public SignUpForm createSignUpForm(String firstName, String lastName, String email) {
        SignUpForm form = new SignUpForm();

        form.setFirstName(firstName);
        form.setLastName(lastName);
        form.setEmail(email);

        return form;
    }

}
