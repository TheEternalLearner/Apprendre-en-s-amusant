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
    private String description;
    private String imageUrl;
    private Integer capacity;
    private String level;
    private String ageBracket;

    public Course(String title, String description, String imageUrl, Integer capacity, String level, String ageBracket) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.capacity = capacity;
        this.level = level;
        this.ageBracket = ageBracket;
    }

}
