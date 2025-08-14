package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "BOM")
public class BOM {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int serial;
    private String material;
    private String unit;
    private int quantity;
    private int unitPrice;
    private int totalCost;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uom_id")
    private UOM uom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bomstyle_id")
    private BomStyle bomStyle;

    public BOM() {
    }

    public BOM(int id, int serial, String material, String unit, int quantity, int unitPrice, int totalCost, UOM uom, BomStyle bomStyle) {
        this.id = id;
        this.serial = serial;
        this.material = material;
        this.unit = unit;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.totalCost = totalCost;
        this.uom = uom;
        this.bomStyle = bomStyle;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSerial() {
        return serial;
    }

    public void setSerial(int serial) {
        this.serial = serial;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(int unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(int totalCost) {
        this.totalCost = totalCost;
    }

    public UOM getUom() {
        return uom;
    }

    public void setUom(UOM uom) {
        this.uom = uom;
    }

    public BomStyle getBomStyle() {
        return bomStyle;
    }

    public void setBomStyle(BomStyle bomStyle) {
        this.bomStyle = bomStyle;
    }
}
