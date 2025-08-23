package com.gsparvej.angularWithSpringBoot.restcontroller;

import com.gsparvej.angularWithSpringBoot.entity.BOM;
import com.gsparvej.angularWithSpringBoot.entity.PurchaseRequisition;
import com.gsparvej.angularWithSpringBoot.service.PurchaseRequisitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requisition")
@CrossOrigin("*")
public class PurchaseRequisitionRestController {

    @Autowired
    private PurchaseRequisitionService requisitionService;

    @GetMapping("")
    public List<PurchaseRequisition> getAllRequisitions() {
        return requisitionService.getAllPurchaseRequisitions();
    }

    // create new Requisition
    @PostMapping("")
    public ResponseEntity<PurchaseRequisition> createRequisition(
            @RequestBody PurchaseRequisition purchaseRequisition

    ) {

        PurchaseRequisition saved = requisitionService.saveOrUpdate(purchaseRequisition);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
