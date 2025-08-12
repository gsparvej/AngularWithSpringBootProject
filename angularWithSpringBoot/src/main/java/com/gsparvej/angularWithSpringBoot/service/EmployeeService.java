package com.gsparvej.angularWithSpringBoot.service;

import com.gsparvej.angularWithSpringBoot.entity.Department;
import com.gsparvej.angularWithSpringBoot.entity.Designation;
import com.gsparvej.angularWithSpringBoot.entity.Employee;
import com.gsparvej.angularWithSpringBoot.repository.IDepartmentRepo;
import com.gsparvej.angularWithSpringBoot.repository.IDesignationRepo;
import com.gsparvej.angularWithSpringBoot.repository.IEmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    @Autowired
    private IEmployeeRepo employeeRepo;

    @Autowired
    private IDepartmentRepo departmentRepo;

    @Autowired
    private IDesignationRepo designationRepo;

    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }
    public Optional<Employee> getEmployeeById(Integer id) {
        return employeeRepo.findById(id);
    }
    public Employee saveOrUpdate(Employee employee,Designation designation, Department department) {
        employee.setDesignation(designation);
        employee.setDepartment(department);
        return employeeRepo.save(employee);

    }
    public void deleteById(Integer id) {
        employeeRepo.deleteById(id);
    }
    public Employee getProfileById(Integer id) {
        return employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
    }
}
