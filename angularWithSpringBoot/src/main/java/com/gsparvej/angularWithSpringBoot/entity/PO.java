package com.gsparvej.angularWithSpringBoot.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "po")
public class PO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;


    private String poNumber;


    private Date poDate;
    private float quantity;
    private float rate;
    private float subTotal;

    private float totalAmount;
    private float tax;
    private Date deliveryDate;

    @Column(length = 500)
    private String termsAndCondition;

    // --- Vendor Relation ---
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vendor_id", nullable = false)
    private Vendor vendor;


    // Items Relation--------
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private RawItems rawItem;
}
