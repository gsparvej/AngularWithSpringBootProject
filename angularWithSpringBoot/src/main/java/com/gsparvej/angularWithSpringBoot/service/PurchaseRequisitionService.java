package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.dto.PurchaseRequisitionDTO;
import com.gsparvej.angularWithSpringBoot.dto.VendorResponseDTO;
import com.gsparvej.angularWithSpringBoot.entity.*;
import com.gsparvej.angularWithSpringBoot.repository.IDepartmentRepo;
import com.gsparvej.angularWithSpringBoot.repository.IItemRepo;
import com.gsparvej.angularWithSpringBoot.repository.IOrderRepo;
import com.gsparvej.angularWithSpringBoot.repository.IPurchaseRequisitionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseRequisitionService {

    @Autowired
    private IPurchaseRequisitionRepo requisitionRepo;
    @Autowired
    private IOrderRepo orderRepo;
    @Autowired
    private IDepartmentRepo departmentRepo;
    @Autowired
    private IItemRepo itemRepo;

    public List<PurchaseRequisition> getAllPurchaseRequisitions() {
        return requisitionRepo.findAll();
    }

    public PurchaseRequisition saveOrUpdate(PurchaseRequisition requisition) {
        Order order = orderRepo.findById(requisition.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + requisition.getOrder().getId()));

        Department department = departmentRepo.findById(requisition.getDepartment().getId())
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + requisition.getDepartment().getId()));

        Item item = itemRepo.findById(requisition.getItem().getId())
                        .orElseThrow(()-> new RuntimeException("Item not found with id: " + requisition.getItem().getId()));
        requisition.setOrder(order);
        requisition.setDepartment(department);
        requisition.setItem(item);


        return requisitionRepo.save(requisition);
    }


    public void deleteById(Integer id) {
        requisitionRepo.deleteById(id);
    }
    public PurchaseRequisition getById(Integer id) {
        return requisitionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Purchase Requisition not found"));
    }


    public List<PurchaseRequisitionDTO> getAllRequisitionsDTOs() {
        return requisitionRepo.findAll().stream().map(req -> {
            PurchaseRequisitionDTO dto = new PurchaseRequisitionDTO();
            dto.setId(req.getId());
            dto.setPrDate(req.getPrDate());
            dto.setRequestedBy(req.getRequestedBy());
            dto.setPrStatus(req.getPrStatus());
            return dto;
        }).toList();
    }
}
