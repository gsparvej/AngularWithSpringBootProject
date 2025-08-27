package com.gsparvej.angularWithSpringBoot.restcontroller;

import com.gsparvej.angularWithSpringBoot.entity.CuttingPlan;
import com.gsparvej.angularWithSpringBoot.entity.RawMaterialsModel;
import com.gsparvej.angularWithSpringBoot.service.RawMaterialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/raw_materials")
@CrossOrigin("*")
public class RawMaterialsRestController {

    @Autowired
    private RawMaterialsService rawMaterialsService;

    @GetMapping("")
    public List<RawMaterialsModel> getAllRawMaterials() {
        return rawMaterialsService.getAllRawMaterials();
    }

    @PostMapping("")
    public ResponseEntity<RawMaterialsModel> createRawMaterials(
            @RequestBody RawMaterialsModel rawMaterialsModel

    ) {

        RawMaterialsModel saved = rawMaterialsService.saveOrUpdate(rawMaterialsModel);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }
}
