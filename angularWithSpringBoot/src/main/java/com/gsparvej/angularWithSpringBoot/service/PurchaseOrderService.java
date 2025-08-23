package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.entity.*;
import com.gsparvej.angularWithSpringBoot.repository.IItemRepo;
import com.gsparvej.angularWithSpringBoot.repository.IPurchaseOrderRepo;
import com.gsparvej.angularWithSpringBoot.repository.IVendorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderService {

    @Autowired
    private IPurchaseOrderRepo purchaseOrderRepo;


    @Autowired
    private IVendorRepo vendorRepo;
    @Autowired
    private IItemRepo itemRepo;

    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepo.findAll();
    }

    public PurchaseOrder saveOrUpdate(PurchaseOrder purchaseOrder) {
        Vendor vendor = vendorRepo.findById(purchaseOrder.getVendor().getId())
                .orElseThrow(() -> new RuntimeException("Vendor not found with id: " + purchaseOrder.getVendor().getId()));


        Item item = itemRepo.findById(purchaseOrder.getItem().getId())
                .orElseThrow(()-> new RuntimeException("Item not found with id: " + purchaseOrder.getItem().getId()));
        purchaseOrder.setVendor(vendor);
        purchaseOrder.setItem(item);


        return purchaseOrderRepo.save(purchaseOrder);
    }


    public void deleteById(Integer id) {
        purchaseOrderRepo.deleteById(id);
    }
    public PurchaseOrder getById(Integer id) {
        return purchaseOrderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Order not found"));
    }
}
