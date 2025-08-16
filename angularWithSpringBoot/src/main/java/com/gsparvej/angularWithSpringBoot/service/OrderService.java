package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.repository.IBomStyleRepo;
import com.gsparvej.angularWithSpringBoot.repository.IBuyerRepo;
import com.gsparvej.angularWithSpringBoot.repository.IEmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    private IBomStyleRepo bomStyleRepo;

    @Autowired
    private IBuyerRepo buyerRepo;

    @Autowired
    private IEmployeeRepo employeeRepo;
}
