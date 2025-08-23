package com.gsparvej.angularWithSpringBoot.repository;

import com.gsparvej.angularWithSpringBoot.entity.ProductionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProductionOrderRepo extends JpaRepository<ProductionOrder, Integer> {
}
