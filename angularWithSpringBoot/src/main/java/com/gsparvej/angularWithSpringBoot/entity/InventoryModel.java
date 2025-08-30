package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "inventories")
public class InventoryModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
}
