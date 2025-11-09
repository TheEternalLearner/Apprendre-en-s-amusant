package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.SignUpForm;
import com.ensamusant.apprendre.service.MailService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class SignUpFormControllerTest {

    @Mock
    MailService mailService;

    SignUpForm formUnderTest;

    SignUpFormController formController;

    @BeforeEach
    public void setUpform() {
        formController = new SignUpFormController(mailService);
        formUnderTest = new SignUpForm();
        formUnderTest.setFirstName("John");
        formUnderTest.setLastName("Smith");
        formUnderTest.setEmail("john.smith@mail.com");
    }

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

    @Test
    public void processingSignUpFormShouldCallMailServiceWithoutError() {
        //Arrange


        //Act
        formController.processSignUpForm(formUnderTest);

        //Assert

        verify(mailService, times(1)).sendMailAfterSignUp(formUnderTest);
    }
}
