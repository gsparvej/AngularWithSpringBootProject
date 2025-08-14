package com.gsparvej.angularWithSpringBoot.repository;


import com.gsparvej.angularWithSpringBoot.entity.BOM;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IBOMRepo extends JpaRepository<BOM, Integer> {
     Optional<BOM> findByStyleCode(String styleCode);
}
