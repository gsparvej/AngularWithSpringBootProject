import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../model/HR/department.model';
import { HrService } from '../../service/HR/hr-service';
import { Router } from '@angular/router';
import { Employee } from '../../../model/HR/employee.model';
import { Designation } from '../../../model/HR/designation.model';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee implements OnInit{

  allDepartments: any[] = [];
  allDesignations: any[] = [];  // Filtered Designations

  filteredDesignations: Designation[] = [];


  selectedDepartment: number = 0;
  selectedDesignation: number = 0;

  formGroup!: FormGroup;

  constructor(
    private hrService: HrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { 
    this.formGroup = formBuilder.group({
       name: ['',Validators.required],
       phoneNumber :['',Validators.required],
       email : ['', [Validators.required, Validators.email]],
       joinDate : ['', Validators.required,],
       department: ['', Validators.required],
       designation: ['', Validators.required]
      


    });
  }

  ngOnInit(): void {
    this.loadDepartment();
    this.loadDesignation();
  

  }



  onDepartmentChange() {

    this.selectedDepartment = this.formGroup.get('department')?.value;

    console.log(this.selectedDepartment);

    this.allDesignations = [];
    this.selectedDesignation = 0;



    if(this.selectedDepartment) {
      this.hrService.getDesignationByDepartment(this.selectedDepartment).subscribe(data => {
        this.allDesignations = data;
        console.log(data);
        this.cdr.markForCheck();
      });

    }

  }

  
  onSubmit(){
    if ( this.formGroup.invalid) return;

    const employee = this.formGroup.value;

    this.hrService.saveEmployee(employee).subscribe(() =>{
      alert('Employee Saved Successfully!');
      this.formGroup.reset();
      this.filteredDesignations = [];
      this.router.navigate(['/viewAllEmp']);
    });
  }


  loadDepartment(): void {

    this.hrService.getAllDepartment().subscribe({

      next: (dep) => {
        this.allDepartments = dep;
        this.cdr.detectChanges();

      },
      error: (err) => {

        console.log(err);
      }

    });

  }

  loadDesignation(): void {

    this.hrService.getAllDesignation().subscribe({

      next: (dep) => {
        this.allDesignations = dep;

      },
      error: (err) => {

        console.log(err);
      }

    });

  }


}

