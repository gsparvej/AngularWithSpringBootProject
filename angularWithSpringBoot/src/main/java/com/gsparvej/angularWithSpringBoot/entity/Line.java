package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "lines")
public class Line {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String lineCode;
    private String floor;
    private int capacityPerHour;


    @OneToMany(mappedBy = "line", cascade = CascadeType.ALL)
    private List<Machine> machines;

    public Line() {
    }

    public Line(int id, String lineCode, String floor, int capacityPerHour, List<Machine> machines) {
        this.id = id;
        this.lineCode = lineCode;
        this.floor = floor;
        this.capacityPerHour = capacityPerHour;
        this.machines = machines;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLineCode() {
        return lineCode;
    }

    public void setLineCode(String lineCode) {
        this.lineCode = lineCode;
    }

    public String getFloor() {
        return floor;
    }

    public void setFloor(String floor) {
        this.floor = floor;
    }

    public int getCapacityPerHour() {
        return capacityPerHour;
    }

    public void setCapacityPerHour(int capacityPerHour) {
        this.capacityPerHour = capacityPerHour;
    }

    public List<Machine> getMachines() {
        return machines;
    }

    public void setMachines(List<Machine> machines) {
        this.machines = machines;
    }
}
