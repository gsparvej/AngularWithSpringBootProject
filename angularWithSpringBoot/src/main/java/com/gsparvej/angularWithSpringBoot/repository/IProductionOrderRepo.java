package com.gsparvej.angularWithSpringBoot.repository;

import com.gsparvej.angularWithSpringBoot.entity.BOM;
import com.gsparvej.angularWithSpringBoot.entity.ProductionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductionOrderRepo extends JpaRepository<ProductionOrder, Integer> {

    // Find all Production Order by Order Id
    @Query("SELECT b FROM ProductionOrder b WHERE b.order.id = :id")
    List<ProductionOrder> findAllProductionOrderByOrderId(@Param("id") int id);
}
