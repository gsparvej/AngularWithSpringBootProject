package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bomStyle")
public class BomStyle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String styleCode;
    private String styleType;
    private String description;

    public BomStyle() {
    }

    public BomStyle(int id, String styleCode, String styleType, String description) {
        this.id = id;
        this.styleCode = styleCode;
        this.styleType = styleType;
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStyleCode() {
        return styleCode;
    }

    public void setStyleCode(String styleCode) {
        this.styleCode = styleCode;
    }

    public String getStyleType() {
        return styleType;
    }

    public void setStyleType(String styleType) {
        this.styleType = styleType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
