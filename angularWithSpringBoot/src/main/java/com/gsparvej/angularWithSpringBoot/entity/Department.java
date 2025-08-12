package com.gsparvej.angularWithSpringBoot.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @OneToMany(mappedBy = "department" , cascade = CascadeType.ALL)
    private List<Designation> designations;


    public Department() {
    }

    public Department(int id, String name, List<Designation> designations) {
        this.id = id;
        this.name = name;
        this.designations = designations;
    }

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

    public List<Designation> getDesignations() {
        return designations;
    }

    public void setDesignations(List<Designation> designations) {
        this.designations = designations;
    }
}
