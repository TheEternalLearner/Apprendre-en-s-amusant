package com.ensamusant.apprendre.integration.controller;

import com.ensamusant.apprendre.controller.SignUpFormController;
import com.ensamusant.apprendre.model.SignUpForm;
import com.ensamusant.apprendre.service.MailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
public class SignUpFormControllerIT {

    private MockMvc mockMvc;

    @Mock
    private MailService mailService;

    private SignUpFormController formController;

    @BeforeEach
    public void setUp() {
        formController = new SignUpFormController(mailService);
        mockMvc = MockMvcBuilders.standaloneSetup(formController).build();
    }

    @Test
    public void processSignUpForm_ShouldReturn200AndCallMailService() throws Exception {
        // Arrange
        String formJson = "{\"firstName\":\"John\",\"lastName\":\"Smith\",\"email\":\"john.smith@mail.com\"}";

        // Act
        mockMvc.perform(post("/api/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(formJson))
                .andExpect(status().isOk());

        // Assert
        ArgumentCaptor<SignUpForm> formCaptor = ArgumentCaptor.forClass(SignUpForm.class);
        verify(mailService, times(1)).sendMailAfterSignUp(formCaptor.capture());
        SignUpForm capturedForm = formCaptor.getValue();

        assertThat(capturedForm.getFirstName()).isEqualTo("John");
        assertThat(capturedForm.getLastName()).isEqualTo("Smith");
        assertThat(capturedForm.getEmail()).isEqualTo("john.smith@mail.com");
    }

}
