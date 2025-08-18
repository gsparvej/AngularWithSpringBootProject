package com.gsparvej.angularWithSpringBoot.dto;

public class BomStyleResponseDTO {
    private int id;
    private String styleCode;

    public BomStyleResponseDTO() {
    }

    public BomStyleResponseDTO(int id, String styleCode) {
        this.id = id;
        this.styleCode = styleCode;
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
}
