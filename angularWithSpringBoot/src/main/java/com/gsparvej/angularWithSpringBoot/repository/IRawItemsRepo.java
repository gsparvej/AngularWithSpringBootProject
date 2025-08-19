package com.gsparvej.angularWithSpringBoot.repository;


import com.gsparvej.angularWithSpringBoot.entity.RawItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRawItemsRepo extends JpaRepository<RawItems, Integer> {
}
