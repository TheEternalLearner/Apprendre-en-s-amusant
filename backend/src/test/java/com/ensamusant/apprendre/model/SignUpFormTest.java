package com.ensamusant.apprendre.model;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class SignUpFormTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void validForm_shouldHaveNoViolations() {
        // Arrange
        SignUpForm form = new SignUpForm();
        form.setFirstName("John");
        form.setLastName("Doe");
        form.setEmail("john@example.com");

        // Act
        Set<ConstraintViolation<SignUpForm>> violations = validator.validate(form);

        // Assert
        assertThat(violations).isEmpty();
    }

    @Test
    void whenFirstNameIsBlank_thenValidationFails() {
        // Arrange
        SignUpForm form = new SignUpForm();
        form.setFirstName("");
        form.setLastName("Doe");
        form.setEmail("john@example.com");

        // Act
        Set<ConstraintViolation<SignUpForm>> violations = validator.validate(form);

        // Assert
        assertThat(violations).isNotEmpty();
    }
}