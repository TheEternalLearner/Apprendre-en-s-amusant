package com.ensamusant.apprendre.model;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignUpForm {
    @NotBlank
    private String firstName;
    private String lastName;
    private String email;
}
