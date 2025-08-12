package com.gsparvej.angularWithSpringBoot.restcontroller;

import com.gsparvej.angularWithSpringBoot.dto.DesignationResponseDTO;
import com.gsparvej.angularWithSpringBoot.entity.Designation;
import com.gsparvej.angularWithSpringBoot.service.DesignationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/designation")
@CrossOrigin("*")
public class DesignationRestController {

    @Autowired
    private DesignationService designationService;

    // Create

    @GetMapping("")
    public List<DesignationResponseDTO> getAllDesignation() {
        return designationService.getAllDesignationDTOs();
    }
    @PostMapping("")
    public Designation saveDesignation(@RequestBody Designation designation) {
        return designationService.saveOrUpdate(designation);
    }

    @GetMapping("/{id}")
    public Designation getById(@PathVariable Integer id) {
        return designationService.findById(id)
                .orElseThrow(() -> new RuntimeException("Designation not found"));
    }
    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Integer id) {
        designationService.delete(id);
    }
    @PutMapping("{id}")
    public Designation update(@PathVariable Integer id, @RequestBody Designation designation) {
        return designationService.update(id, designation);
    }




}
