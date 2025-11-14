package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.SignUpForm;
import com.ensamusant.apprendre.service.MailService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/signup")
public class SignUpFormController {

    private MailService mailService;

    public SignUpFormController(MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/submit")
    public ResponseEntity<Void> processSignUpForm(@RequestBody SignUpForm form) {
        mailService.sendMailAfterSignUp(form);
        return ResponseEntity.ok().build();
    }
}
