package com.ensamusant.apprendre.model;

import jakarta.persistence.*;
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
    private String title;
    private Integer capacity;
    private String level;
    private String dayOfWeek;
    private String timeSlot;
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
