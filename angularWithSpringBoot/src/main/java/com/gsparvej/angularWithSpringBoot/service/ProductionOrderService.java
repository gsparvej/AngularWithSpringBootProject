package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.entity.*;
import com.gsparvej.angularWithSpringBoot.repository.IBomStyleRepo;
import com.gsparvej.angularWithSpringBoot.repository.IOrderRepo;
import com.gsparvej.angularWithSpringBoot.repository.IProductionOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionOrderService {

    @Autowired
    private IProductionOrderRepo productionOrderRepo;
    @Autowired
    private IBomStyleRepo bomStyleRepo;
    @Autowired
    private IOrderRepo orderRepo;


    public List<ProductionOrder> getAllProductionOrders() {
        return productionOrderRepo.findAll();
    }

    public ProductionOrder saveOrUpdate(ProductionOrder productionOrder) {
        BomStyle bomStyle = bomStyleRepo.findById(productionOrder.getBomStyle().getId())
                .orElseThrow(() -> new RuntimeException("BomStyle not found with id: " + productionOrder.getBomStyle().getId()));


        Order order = orderRepo.findById(productionOrder.getOrder().getId())
                .orElseThrow(()-> new RuntimeException("Order not found with id: " + productionOrder.getOrder().getId()));
        productionOrder.setBomStyle(bomStyle);
        productionOrder.setOrder(order);


        return productionOrderRepo.save(productionOrder);
    }


    public void deleteById(Integer id) {
        productionOrderRepo.deleteById(id);
    }
    public ProductionOrder getById(Integer id) {
        return productionOrderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Production Order not found"));
    }
}
