package com.gsparvej.angularWithSpringBoot.restcontroller;

import com.gsparvej.angularWithSpringBoot.dto.DepartmentResponseDTO;
import com.gsparvej.angularWithSpringBoot.entity.Department;
import com.gsparvej.angularWithSpringBoot.service.DepartmentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/api/department/")
public class DepartmentRestController {

    @Autowired
    private DepartmentService departmentService;

    @PostMapping("")
    public ResponseEntity<String> saveDepartment(@RequestBody Department department) {
       try {
           departmentService.saveDepartment(department);
           return ResponseEntity.ok("Data Saved");
       } catch (EntityNotFoundException e) {
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());


       }

    }

    @GetMapping("")
    public ResponseEntity<List<DepartmentResponseDTO>> getAllDepartments() {
        try{
            List<DepartmentResponseDTO> dList = departmentService.getAllDepartmentDTOs();
            return ResponseEntity.ok(dList);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        }
    }
}
