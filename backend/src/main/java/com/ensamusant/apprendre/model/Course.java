package com.ensamusant.apprendre.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name= "courses")
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String title;
    @NotNull
    @Min(1)
    private Integer capacity;
    @NotBlank
    private String level;
    @NotBlank
    private String dayOfWeek;
    @NotBlank
    private String timeSlot;
    @NotBlank
    private String location;

    public Course(String title, Integer capacity, String level, String dayOfWeek, String timeSlot, String location) {
        this.title = title;
        this.capacity = capacity;
        this.level = level;
        this.dayOfWeek = dayOfWeek;
        this.timeSlot = timeSlot;
        this.location = location;
    }

}
