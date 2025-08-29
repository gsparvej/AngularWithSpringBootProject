package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.dto.ProductionSummaryResponseDTO;
import com.gsparvej.angularWithSpringBoot.repository.IProductionOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductionSummaryService {

    @Autowired
    private IProductionOrderRepo productionOrderRepo;

    public List<ProductionSummaryResponseDTO> getProductionSummary() {
        return productionOrderRepo.fetchProductionSummary();
    }
}
