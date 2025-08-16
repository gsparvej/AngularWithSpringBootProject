package com.gsparvej.angularWithSpringBoot.repository;

import com.gsparvej.angularWithSpringBoot.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderRepo extends JpaRepository<Order, Integer> {
}
