package com.ensamusant.apprendre.controller;

import com.ensamusant.apprendre.model.SignUpForm;
import com.ensamusant.apprendre.service.MailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

    @Test
    public void processingSignUpFormShouldCallMailServiceWithoutError() {
        //Arrange

        //Act
        ResponseEntity<Void> response = formController.processSignUpForm(formUnderTest);

        //Assert
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        verify(mailService, times(1)).sendMailAfterSignUp(formUnderTest);
    }
}
