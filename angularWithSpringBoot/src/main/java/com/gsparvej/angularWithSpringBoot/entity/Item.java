package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String categoryName;
    private String unit;

    @OneToMany(mappedBy = "item" , cascade = CascadeType.ALL)
    private List<PO> poList;

    public Item() {
    }

    public Item(int id, String categoryName, String unit, List<PO> poList) {
        this.id = id;
        this.categoryName = categoryName;
        this.unit = unit;
        this.poList = poList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public List<PO> getPoList() {
        return poList;
    }

    public void setPoList(List<PO> poList) {
        this.poList = poList;
    }
}
