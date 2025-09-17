package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.dto.RoleSuperAdminResponseDTO;
import com.gsparvej.angularWithSpringBoot.entity.RoleSuperAdmin;
import com.gsparvej.angularWithSpringBoot.repository.IRoleSuperAdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleSuperAdminService {

    @Autowired
    private IRoleSuperAdminRepo roleSuperAdminRepo;

    public List<RoleSuperAdmin> getAllSuperAdmin() {
        return roleSuperAdminRepo.findAll();
    }


    public List<RoleSuperAdminResponseDTO> getAllRoleSuperAdminResponseDTOS() {
        return roleSuperAdminRepo.findAll().stream().map(superAdmin -> {
            RoleSuperAdminResponseDTO dto = new RoleSuperAdminResponseDTO();


            dto.setId(superAdmin.getId());
            dto.setEmail(superAdmin.getEmail());
            dto.setName(superAdmin.getName());
            dto.setAddress(superAdmin.getAddress());
            dto.setPhone(superAdmin.getPhone());
            dto.setGender(superAdmin.getGender());
            dto.setPhoto(superAdmin.getPhoto());
            dto.setDateOfBirth(superAdmin.getDateOfBirth());


            return dto;
        }).toList();
    }



    public RoleSuperAdmin save(RoleSuperAdmin roleSuperAdmin) {
        return roleSuperAdminRepo.save(roleSuperAdmin);
    }

    public void delete(Long id) {
        roleSuperAdminRepo.deleteById(id);
    }

    public RoleSuperAdmin getProfileByUserId(int userId) {
        return roleSuperAdminRepo.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Role Super Admin not found"));
    }
}
