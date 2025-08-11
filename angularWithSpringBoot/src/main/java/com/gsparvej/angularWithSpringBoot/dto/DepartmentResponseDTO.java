package com.gsparvej.angularWithSpringBoot.dto;

import java.util.List;

public class DepartmentResponseDTO {
    private int id;
    private String name;
    private List<Integer> designations;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getDesignations() {
        return designations;
    }

    public void setDesignations(List<Integer> designations) {
        this.designations = designations;
    }
}
