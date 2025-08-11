package com.gsparvej.angularWithSpringBoot.service;


import com.gsparvej.angularWithSpringBoot.dto.DesignationResponseDTO;
import com.gsparvej.angularWithSpringBoot.entity.Department;
import com.gsparvej.angularWithSpringBoot.entity.Designation;
import com.gsparvej.angularWithSpringBoot.repository.IDepartmentRepo;
import com.gsparvej.angularWithSpringBoot.repository.IDesignationRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesignationService {

    @Autowired
    private IDesignationRepo designationRepo;

    @Autowired
    private IDepartmentRepo departmentRepo;

    public List<DesignationResponseDTO> getAllDesignationDTOs() {
        return designationRepo.findAll().stream().map(desig -> {
            DesignationResponseDTO dto = new DesignationResponseDTO();
            dto.setId(desig.getId());
            dto.setDesignationTitle(desig.getDesignationTitle());

            if (desig.getDepartment() != null) {
                dto.setDepartmentId(desig.getDepartment().getId());
                dto.setDepartmentName(desig.getDepartment().getName());

            }
            return dto;
        }).toList();
    }

    @Transactional
    public Designation create(Designation designation) {
        if (designation.getDepartment() !=null) {
            int departmentId = designation.getDepartment().getId();
            Department department = departmentRepo.findById(departmentId)
                    .orElseThrow(() -> new RuntimeException("Department Not Found with id " + departmentId));
                    designation.setDepartment(department);
        }
        return designationRepo.save(designation);
    }

    // Read One By Id
    public Optional<Designation> findById(int id) {
        return designationRepo.findById(id);
    }

    // Update by ID
    public Designation update(int id, Designation updateddesignation) {
        Designation existing = designationRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Designation not found with id " + id));

        existing.setDesignationTitle(updateddesignation.getDesignationTitle());

        if (updateddesignation.getDepartment() != null) {
            // Optionally verify district exists
            Department department = departmentRepo.findById(updateddesignation.getDepartment().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found with id " + updateddesignation.getDepartment().getId()));
            existing.setDepartment(department);
        }

        return designationRepo.save(existing);
    }

    // delete by id

    public void delete(int id) {
        designationRepo.deleteById(id);
    }

}
