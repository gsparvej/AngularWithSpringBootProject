package com.gsparvej.angularWithSpringBoot.dto;

import java.util.Date;

public class EmployeeDTO {

    private int id;
    private String name;
    private String phoneNumber;
    private String email;
    private Date joinDate;
    private String designationTitle;
    private String departmentName;

    // Constructor
    public EmployeeDTO(int id, String name, String phoneNumber, String email, Date joinDate, String designationTitle, String departmentName) {
        this.id = id;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.joinDate = joinDate;
        this.designationTitle = designationTitle;
        this.departmentName = departmentName;
    }

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Date getJoinDate() { return joinDate; }
    public void setJoinDate(Date joinDate) { this.joinDate = joinDate; }

    public String getDesignationTitle() { return designationTitle; }
    public void setDesignationTitle(String designationTitle) { this.designationTitle = designationTitle; }

    public String getDepartmentName() { return departmentName; }
    public void setDepartmentName(String departmentName) { this.departmentName = departmentName; }


}
