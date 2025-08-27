package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.entity.CutBundle;
import com.gsparvej.angularWithSpringBoot.entity.CuttingPlan;
import com.gsparvej.angularWithSpringBoot.entity.ProductionOrder;
import com.gsparvej.angularWithSpringBoot.entity.UOM;
import com.gsparvej.angularWithSpringBoot.repository.ICutBundleRepo;
import com.gsparvej.angularWithSpringBoot.repository.ICuttingPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CutBundleService {

    @Autowired
    private ICutBundleRepo cutBundleRepo;

    @Autowired
    private ICuttingPlanRepo cuttingPlanRepo;

    public List<CutBundle> getAllCutBundles() {
        return cutBundleRepo.findAll();
    }
    public Optional<CutBundle> getCutBundleById (Integer id) {
        return cutBundleRepo.findById(id);
    }
    public CutBundle saveOrUpdate(CutBundle cutBundle) {
        CuttingPlan cuttingPlan = cuttingPlanRepo.findById(cutBundle.getCuttingPlan().getId())
                .orElseThrow(() -> new RuntimeException("Cutting Plan not found with id: " + cutBundle.getCuttingPlan().getId()));


        cutBundle.setCuttingPlan(cuttingPlan);


        return cutBundleRepo.save(cutBundle);
    }

    public void deleteById(Integer id) {
        cuttingPlanRepo.deleteById(id);
    }
}
