package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.repository.ICutBundleRepo;
import com.gsparvej.angularWithSpringBoot.repository.ICuttingPlanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CutBundleService {

    @Autowired
    private ICutBundleRepo cutBundleRepo;

    @Autowired
    private ICuttingPlanRepo cuttingPlanRepo;

    
}
