package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.SignUpForm;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

public class SignUpFormControllerTest {

    @Autowired
    SignUpFormController formController = new SignUpFormController();

    // Sanity check
    @Test
    public void createSignUpFormTest() {
        //Arrange
        SignUpForm form = formController.createSignUpForm("John", "Smith", "john.smith@mail.com");

        //Act

        //Assert
        assertThat(form.getFirstName()).isNotEmpty().contains("John");
        assertThat(form.getLastName()).isNotEmpty().contains("Smith");
        assertThat(form.getEmail()).isNotEmpty().contains("john.smith@mail.com");
    }


}
