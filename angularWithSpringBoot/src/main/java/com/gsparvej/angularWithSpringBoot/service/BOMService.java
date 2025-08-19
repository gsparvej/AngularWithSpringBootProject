package com.gsparvej.angularWithSpringBoot.service;


import com.gsparvej.angularWithSpringBoot.entity.*;
import com.gsparvej.angularWithSpringBoot.repository.IBOMRepo;
import com.gsparvej.angularWithSpringBoot.repository.IBomStyleRepo;
import com.gsparvej.angularWithSpringBoot.repository.IUOMRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BOMService {

    @Autowired
    private IBOMRepo bomRepo;
    @Autowired
    private IBomStyleRepo bomStyleRepo;
    @Autowired
    private IUOMRepo uomRepo;

    public List<BOM> getAllBoms() {
        return bomRepo.findAll();
    }
    public Optional<BOM> getBomById(Integer id) {
        return bomRepo.findById(id);
    }

    public BOM saveOrUpdate(BOM bom) {
        BomStyle bomStyle = bomStyleRepo.findById(bom.getBomStyle().getId())
                .orElseThrow(() -> new RuntimeException("BomStyle not found with id: " + bom.getBomStyle().getId()));

        UOM uom = uomRepo.findById(bom.getUom().getId())
                .orElseThrow(() -> new RuntimeException("UOM not found with id: " + bom.getUom().getId()));

        bom.setBomStyle(bomStyle);
        bom.setUom(uom);

        return bomRepo.save(bom);
    }


    public void deleteById(Integer id) {
        bomRepo.deleteById(id);
    }
    public BOM getById(Integer id) {
        return bomRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("BOM not found"));
    }


    // ✅ New Service Method: Get BOMs by Style Code
    public List<BOM> getBOMsByStyleCode(String styleCode) {
        return bomRepo.findAllByStyleCode(styleCode);
    }




}

