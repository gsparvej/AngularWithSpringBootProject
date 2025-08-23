package com.gsparvej.angularWithSpringBoot.restcontroller;

import com.gsparvej.angularWithSpringBoot.entity.ProductionOrder;
import com.gsparvej.angularWithSpringBoot.service.ProductionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/production_order")
@CrossOrigin("*")
public class ProductionOrderRestController {
    @Autowired
    private ProductionOrderService productionOrderService;

    @GetMapping("")
    public List<ProductionOrder> getAllProductionOrders() {
        return productionOrderService.getAllProductionOrders();
    }

    // create new Requisition
    @PostMapping("")
    public ResponseEntity<ProductionOrder> createProductionOrder(
            @RequestBody ProductionOrder productionOrder

    ) {

        ProductionOrder saved = productionOrderService.saveOrUpdate(productionOrder);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
