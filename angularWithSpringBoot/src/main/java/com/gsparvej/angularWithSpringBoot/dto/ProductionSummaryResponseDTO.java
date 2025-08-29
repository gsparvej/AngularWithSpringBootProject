package com.gsparvej.angularWithSpringBoot.dto;

public class ProductionSummaryResponseDTO {

    private int orderId;
    private int plannedQty;
    private int producedQty;
    private int remainingQty;
    private String status;

    public ProductionSummaryResponseDTO() {
    }

    public ProductionSummaryResponseDTO(int orderId, int plannedQty, int producedQty, int remainingQty, String status) {
        this.orderId = orderId;
        this.plannedQty = plannedQty;
        this.producedQty = producedQty;
        this.remainingQty = remainingQty;
        this.status = status;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getPlannedQty() {
        return plannedQty;
    }

    public void setPlannedQty(int plannedQty) {
        this.plannedQty = plannedQty;
    }

    public int getProducedQty() {
        return producedQty;
    }

    public void setProducedQty(int producedQty) {
        this.producedQty = producedQty;
    }

    public int getRemainingQty() {
        return remainingQty;
    }

    public void setRemainingQty(int remainingQty) {
        this.remainingQty = remainingQty;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
