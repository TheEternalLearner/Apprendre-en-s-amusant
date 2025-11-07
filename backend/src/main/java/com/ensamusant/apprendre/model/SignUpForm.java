package com.ensamusant.apprendre.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignUpForm {
    private String firstName;
    private String lastName;
    private String email;
}
