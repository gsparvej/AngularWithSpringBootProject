package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.entity.*;
import com.gsparvej.angularWithSpringBoot.repository.IOrderRepo;
import com.gsparvej.angularWithSpringBoot.repository.IRawMaterialsRepo;
import com.gsparvej.angularWithSpringBoot.repository.IUOMRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RawMaterialsService {
    @Autowired
    private IRawMaterialsRepo rawMaterialsRepo;

    @Autowired
    private IUOMRepo  uomRepo;

    @Autowired
    private IOrderRepo orderRepo;

    public List<RawMaterialsModel> getAllRawMaterials() {
        return rawMaterialsRepo.findAll();
    }
    public Optional<RawMaterialsModel> getRawMaterialsById (Integer id) {
        return rawMaterialsRepo.findById(id);
    }
    public RawMaterialsModel saveOrUpdate(RawMaterialsModel rawMaterials) {

        Order order = orderRepo.findById(rawMaterials.getOrder().getId())
                .orElseThrow(() -> new RuntimeException("Order Not Found" + rawMaterials.getOrder().getId()));


        UOM uom = uomRepo.findById(rawMaterials.getUom().getId())
                .orElseThrow(() -> new RuntimeException("UOM not found with id: " + rawMaterials.getUom().getId()));

        rawMaterials.setOrder(order);
        rawMaterials.setUom(uom);

        return rawMaterialsRepo.save(rawMaterials);
    }

    public void deleteById(Integer id) {
        rawMaterialsRepo.deleteById(id);
    }
}
