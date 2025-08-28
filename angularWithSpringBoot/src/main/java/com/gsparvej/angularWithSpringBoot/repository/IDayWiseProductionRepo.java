package com.gsparvej.angularWithSpringBoot.repository;

import com.gsparvej.angularWithSpringBoot.entity.DayWiseProduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IDayWiseProductionRepo extends JpaRepository<DayWiseProduction, Integer> {
}
