package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.SignUpForm;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

public class SignUpControllerTest {

    // Sanity check
    @Test
    public void signUpFormIsValidTest() {
        //Arrange
        SignUpForm signUpForm = new SignUpForm();
        signUpForm.setFirstName("John");
        signUpForm.setLastName("Smith");
        signUpForm.setEmail("john.smith@mail.com");

        //Act

        //Assert
        assertThat(signUpForm.getFirstName()).isNotEmpty().contains("John");
        assertThat(signUpForm.getLastName()).isNotEmpty().contains("Smith");
        assertThat(signUpForm.getEmail()).isNotEmpty().contains("john.smith@mail.com");
    }

}
