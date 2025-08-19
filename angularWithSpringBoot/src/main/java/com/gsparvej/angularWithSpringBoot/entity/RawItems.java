package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rawItems")
public class RawItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String categoryName;
    private String unit;

    @OneToMany(mappedBy = "rawItem" , cascade = CascadeType.ALL)
    private List<PO> poList;
}
