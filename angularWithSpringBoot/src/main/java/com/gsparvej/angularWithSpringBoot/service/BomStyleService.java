package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.entity.BomStyle;
import com.gsparvej.angularWithSpringBoot.entity.Buyer;
import com.gsparvej.angularWithSpringBoot.repository.IBomStyleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BomStyleService {

    @Autowired
    private IBomStyleRepo bomStyleRepo;

    public List<BomStyle> getAllBomStyle() {
        return bomStyleRepo.findAll();
    }
    public BomStyle saveBomStyle(BomStyle bomStyle) {
        return bomStyleRepo.save(bomStyle);
    }
    public void deleteById(Integer id) {
        bomStyleRepo.deleteById(id);
    }
}
