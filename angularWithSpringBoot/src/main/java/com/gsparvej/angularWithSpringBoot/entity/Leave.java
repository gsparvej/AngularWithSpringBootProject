package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;


@Table(name = "leave")
public class Leave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
}
