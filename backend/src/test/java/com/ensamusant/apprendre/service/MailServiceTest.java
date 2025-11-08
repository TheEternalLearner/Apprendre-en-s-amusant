package com.ensamusant.apprendre.service;


import com.ensamusant.apprendre.model.SignUpForm;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MailServiceTest {

    @Mock
    private JavaMailSender mailSender;

    private SignUpForm form;

    @Test
    public void shouldSendMailAfterSignUp() {
        //Arrange
        MailService mailService = new MailService(mailSender);
        ArgumentCaptor<JavaMailSender> mailSenderArgumentCaptor =ArgumentCaptor.forClass(JavaMailSender.class);
        form.setFirstName("John");
        form.setLastName("Smith");
        form.setEmail("john.smith@email.com");

        //Act
        mailService.sendMailAfterSignUp(form);

        //Assert
        ArgumentCaptor<SimpleMailMessage> messageCaptor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(mailSender).send(messageCaptor.capture()); SimpleMailMessage sentMessage = messageCaptor.getValue();
        assertThat(sentMessage.getTo()).contains("john.smith@mail.com");
        assertThat(sentMessage.getText()).contains("John", "Smith");

    }
}
