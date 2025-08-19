package com.gsparvej.angularWithSpringBoot.service;


import com.gsparvej.angularWithSpringBoot.entity.BomStyle;
import com.gsparvej.angularWithSpringBoot.entity.RawItems;
import com.gsparvej.angularWithSpringBoot.repository.IRawItemsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RawItemsService {

    @Autowired
    private IRawItemsRepo rawItemsRepo;


    public List<RawItems> getAllRawItems() {
        return rawItemsRepo.findAll();
    }
    public RawItems saveItems(RawItems rawItems) {
        return rawItemsRepo.save(rawItems);
    }
    public void deleteById(Integer id) {
        rawItemsRepo.deleteById(id);
    }
}
