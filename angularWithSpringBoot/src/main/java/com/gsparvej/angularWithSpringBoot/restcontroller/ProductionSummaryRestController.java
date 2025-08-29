package com.gsparvej.angularWithSpringBoot.restcontroller;

import com.gsparvej.angularWithSpringBoot.dto.ProductionSummaryResponseDTO;
import com.gsparvej.angularWithSpringBoot.service.ProductionSummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/proSummary")
@CrossOrigin("*")
public class ProductionSummaryRestController {

    @Autowired
    private ProductionSummaryService productionSummaryService;

    @GetMapping("/production-summary")
    public List<ProductionSummaryResponseDTO> getProductionSummary() {
        return productionSummaryService.getProductionSummary();
    }
}
