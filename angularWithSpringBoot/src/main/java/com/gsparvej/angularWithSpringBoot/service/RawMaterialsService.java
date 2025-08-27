package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.repository.IRawMaterialsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RawMaterialsService {
    @Autowired
    private IRawMaterialsRepo rawMaterialsRepo;

    
}
