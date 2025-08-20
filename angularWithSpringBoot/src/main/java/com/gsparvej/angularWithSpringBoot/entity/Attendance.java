package com.gsparvej.angularWithSpringBoot.entity;


import jakarta.persistence.*;


@Table(name = "attendance")
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String attDate;

}
