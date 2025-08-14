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

    public BOM saveOrUpdate(BOM bom, BomStyle bomStyle, UOM uom) {
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
    public Optional<BOM> getBomByStyleCode(String styleCode) {
        return bomRepo.findByStyleCode(styleCode);

    }
}
