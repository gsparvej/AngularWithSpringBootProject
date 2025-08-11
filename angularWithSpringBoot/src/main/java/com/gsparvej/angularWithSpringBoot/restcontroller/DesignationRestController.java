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
@RequestMapping("/api/designation/")
public class DesignationRestController {

    @Autowired
    private DesignationService designationService;

    // Create

    @PostMapping
    public ResponseEntity<Designation> createDesignation(@RequestBody Designation designation) {
        Designation created = designationService.create(designation);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<DesignationResponseDTO>> getAllDesignations() {
        List<DesignationResponseDTO> list = designationService.getAllDesignationDTOs();
        return ResponseEntity.ok(list);
    }

    // Get one by id
    @GetMapping
    public ResponseEntity<Designation> getDesignationById(@PathVariable int id) {
        return designationService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // delete by Id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesignation(@PathVariable int id) {
        designationService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
